class Admin::UsersController < AdminController
  def create
    operation = Users::Create.(admin_user: current_user, params: params.require(:user).permit!.to_h)

    unless operation.success?
      render json: { error: operation.result }, status: 422 and return
    end

    render json: { user: operation.result }
  end

  def index
    operation = Users::List.(user: current_user)

    unless operation.success?
      render json: { error: operation.result }, status: 422 and return
    end

    render json: { users: operation.result }
  end

  def lock
    operation = Users::LockAndUnlock.(admin_user: current_user, user_id: params.require(:id), action: params.require(:user).permit(:action)[:action])

    unless operation.success?
      render json: { error: operation.result }, status: 422 and return
    end

    render json: { user: operation.result }
  end

  def payroll_categories
    operation = Users::EditPayrollCategories.(admin_user: current_user, user_id: params.require(:id), categories: params.require(:categories).map { |c| c.permit!.to_h })

    unless operation.success?
      render json: { error: operation.result }, status: 422 and return
    end

    render json: { payroll_categories: operation.result }
  end
end
