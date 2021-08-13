module Users
  module Create
    module_function

    def call(admin_user:, params:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      random_password = SecureRandom.hex(16)

      User.db.transaction do
        begin
          user  = User.create(params.merge(password: random_password, password_confirmation: random_password))
          token = user.send(:set_reset_password_token)

          send_mail(user: user, token: token)

          return Result.new(:ok, UserPresenter.display(user))
        rescue
          return Result.new(:error, "Unknown error")
        end
      end
    end

    def send_mail(user:, token:)
      UserSignupMailer.with(user: user, token: token).reset_password_instructions.deliver_now
    end
  end
end
