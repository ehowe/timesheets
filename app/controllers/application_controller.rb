class ApplicationController < ActionController::Base
  before_action :verified_request?, only: [:create, :destroy, :update]
  before_action :configure_permitted_parameters, if: :devise_controller?

  protect_from_forgery with: :null_session

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up, keys: [:first_name, :last_name, :password_confirmation]
    )
  end

  def verified_request?
    request.headers["HTTP_X_XSRF_TOKEN"] == cookies["csrf_token"]
  end
end
