module Users
  module Create
    module_function

    def call(admin_user:, params:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      random_password = SecureRandom.hex(16)

      User.db.transaction do
        begin
          u     = User.create(params.merge(password: random_password, password_confirmation: random_password))
          token = u.send(:set_reset_password_token)

          UserSignupMailer.with(user: u, token: token).reset_password_instructions.deliver_now

          return Result.new(:ok, UserPresenter.display(u))
        rescue
          return Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
