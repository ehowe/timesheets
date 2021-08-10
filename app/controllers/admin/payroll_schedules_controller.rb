class Admin::PayrollSchedulesController < AdminController
  skip_before_action :ensure_admin, only: [:index, :show, :pay_periods]

  before_action :get_payroll_schedule, only: [:show, :delete, :pay_periods]

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

  def pay_periods
    operation = PayrollSchedules::GetPayPeriods.(payroll_schedule: @payroll_schedule, number: params.permit(:number).fetch(:number, 5))

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { pay_periods: operation.result }
  end

  protected

  def get_payroll_schedule
    @payroll_schedule ||= PayrollSchedule[params.require(:id).to_i]
  end
end
