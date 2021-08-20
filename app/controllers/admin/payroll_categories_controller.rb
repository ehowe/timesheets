class Admin::PayrollCategoriesController < AdminController
  skip_before_action :ensure_admin, only: [:index]

  def index
    operation = PayrollCategories::List.call

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { payroll_categories: operation.result } and return
  end

  def create
    operation = PayrollCategories::Create.(admin_user: current_user, params: params.require(:payroll_category).permit!.to_h)

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { payroll_category: operation.result }
  end
end
