class Admin::PayrollSchedulesController < AdminController
  skip_before_action :ensure_admin, if: [:index, :show]

  def index
    operation = PayrollSchedules::List.call

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { payroll_schedules: operation.result } and return
  end

  def create
    operation = PayrollSchedules::Create.(user: current_user, params: params.require(:payroll_schedule).permit!.to_h)

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { schedule: operation.result }
  end

  def show
  end

  def destroy
  end
end
