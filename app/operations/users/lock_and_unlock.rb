module Users
  module LockAndUnlock
    module_function

    def call(admin_user:, user_id:, action:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin
      return Result.new(:error, "Invalid action") unless %w(lock unlock).include?(action)
      return Result.new(:error, "User cannot change their own lock status") if admin_user.id == user_id

      user = User[user_id.to_i]

      return Result.new(:error, "User not found") unless user

      user.db.transaction do
        begin
          case action
          when "lock" then user.update(locked_at: Time.now)
          when "unlock" then user.update(locked_at: nil)
          end

          return Result.new(:ok, UserPresenter.display(user))
        rescue
          return Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
