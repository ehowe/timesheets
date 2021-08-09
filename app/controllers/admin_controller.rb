class AdminController < AuthenticatedApiController
  before_action :ensure_admin

  def ensure_admin
    render json: {}, status: 404 and return unless current_user.admin
  end
end
