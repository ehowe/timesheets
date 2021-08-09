class AdminController < AuthenticatedApiController
  before_action :ensure_admin

  def ensure_admin
    p "here"
    render status: 404 unless current_user.admin
  end
end
