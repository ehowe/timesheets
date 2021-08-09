class AuthenticatedApiController < ActionController::Base
  skip_before_action :verify_authenticity_token

  before_action :validate_jwt

  # The JWT is in the signed cookie jar and is sent back in that format
  def decoded_jwt
    JwtWrapper.decode(
      Base64.decode64(
        Oj.load(
          Base64.decode64(params["token"].split("--").first)
        )["_rails"]["message"]
      ).delete_prefix('"').delete_suffix('"')
    )["value"]
  rescue
    nil
  end

  def validated?
    return false unless cookies["jwt"] == params["token"]
    return false if decoded_jwt.blank?

    !JwtWrapper.expired?(decoded_jwt)
  end

  def validate_jwt
    render json: {"error" => "Invalid session token"}, status: 401 and return unless validated?
  end

  def current_user
    User.where(id: decoded_jwt["id"]).first
  end
end
