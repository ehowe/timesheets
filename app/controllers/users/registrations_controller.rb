class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super
  rescue ActionController::UnknownFormat
    render json: { user: UserPresenter.display(resource) }
  end
end
