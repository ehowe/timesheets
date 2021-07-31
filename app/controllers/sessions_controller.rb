class SessionsController < Devise::SessionsController
  # TODO: Figure out how to turn this back on
  skip_before_action :verify_authenticity_token
  clear_respond_to
  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with UserPresenter.display(resource), location: after_sign_in_path_for(resource)
  end

  def index
  end
end
