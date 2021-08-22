class EntriesController < AuthenticatedApiController
  before_action :fetch_timesheet

  def create
    operation = TimesheetEntries::Create.(user: current_user, params: params.require(:entry).permit(:payroll_category_id, :start_at, :end_at).to_h.merge(timesheet_id: @timesheet.id))

    render json: operation.error, status: 422 and return unless operation.success?

    render json: { entry: operation.result }, status: :created
  end

  def destroy
  end

  def show
  end

  def update
  end

  def index
    operation = TimesheetEntries::List.(current_user, @timesheet)

    render json: operation.result
  end

  def fetch_timesheet
    @timesheet = Timesheet[params.fetch(:id)]
  end
end
