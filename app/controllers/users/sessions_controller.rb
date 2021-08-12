class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    super do |resource|
      set_cookie(resource)

      respond_with UserPresenter.display(resource), location: "/" and return
    end
  end

  def destroy
    super do
      cookies.delete(:jwt)
      cookies.delete(:user)

      respond_with {} and return
    end
  end

  protected

  def set_cookie(user)
    cookies.signed[:jwt]  = JwtWrapper.encode(id: user.id)
    cookies.signed[:user] = { value: UserPresenter.display(user).symbolize_keys }
  end
end
