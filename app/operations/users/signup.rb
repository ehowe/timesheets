module Users
  module Signup
    module_function

    def call(admin_user:, params:)
      u = User.create(params)
      u.send(:set_reset_password_token)
    end
  end
end
