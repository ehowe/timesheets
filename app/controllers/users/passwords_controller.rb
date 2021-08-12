class Users::PasswordsController < Devise::PasswordsController
  respond_to :json

  def update
    super do
      respond_with UserPresenter.display(resource), location: "/" and return
    end
  end
end
