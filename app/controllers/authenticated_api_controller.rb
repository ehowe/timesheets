class AuthenticatedApiController < ActionController::Base
  before_action :validate_jwt

  def decoded_jwt
    JwtWrapper.decode(params["token"])
  end

  def validated?
    return false if decoded_jwt.blank?

    !JwtWrapper.expired?(params["token"])
  end

  def validate_jwt
    render json: {"error" => "Invalid session token"}, status: 401 and return unless validated?
  end

  def current_user
    decoded_jwt = JwtWrapper.decode(params["token"])

    User.where(id: decoded_jwt["user_id"]).first
  end
end
