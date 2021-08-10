class Admin::PayrollSchedulesController < AdminController
  skip_before_action :ensure_admin, only: [:index, :show, :date_ranges]

  before_action :get_payroll_schedule, only: [:show, :delete, :date_ranges]

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

  def date_ranges
    operation = PayrollSchedules::GetDateRanges.(payroll_schedule: @payroll_schedule, number: params.permit(:number).fetch(:number, 5))

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { ranges: operation.result }
  end

  protected

  def get_payroll_schedule
    @payroll_schedule ||= PayrollSchedule[params.require(:id).to_i]
  end
end
