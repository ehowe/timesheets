class UserSignupMailer < ActionMailer::Base
  def reset_password_instructions
    @user  = params[:user]
    @token = @user.reset_password_token

    mail(to: @user.email, subject: "Welcome!")
  end
end
