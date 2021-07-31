class UsersController < ActionController::Base
  def check_for_user
    user = user_signed_in? ? current_user : User.new

    render json: UserPresenter.display(user)
  end
end
