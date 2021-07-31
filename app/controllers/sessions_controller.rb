class SessionsController < Devise::SessionsController
  clear_respond_to
  respond_to :json

  def create
    super do |resource|
      if user_signed_in?
        resource.token = JWTWrapper.encode(user_id: current_user.id)
      end
    end
  end
end
