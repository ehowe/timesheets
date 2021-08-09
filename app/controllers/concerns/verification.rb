module Verification
  extend ActiveSupport::Concern

  included do
    before_action :verified_request?, only: [:create, :destroy, :update]
  end

  protected

  def verified_request?
    request.headers["HTTP_X_XSRF_TOKEN"] == cookies["csrf_token"]
  end
end
