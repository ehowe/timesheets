class PagesController < ActionController::Base
  include ActionController::Cookies

  before_action :set_csrf_cookie

  layout "application"

  def index
  end

  protected

  def set_csrf_cookie
    cookies.encrypted["csrf_token"] = form_authenticity_token
  end
end
