class TimesheetsController < AuthenticatedApiController
  before_action :get_timesheet, only: [:pay_period]

  def create
    operation = Timesheets::Create.(user: current_user, params: params.require(:timesheet).permit(:pay_period_id).to_h)

    render json: operation.error, status: 422 and return unless operation.success?

    render json: { sheet: operation.result }, status: :created
  end

  def destroy
  end

  def show
  end

  def update
  end

  def index
    operation = Timesheets::List.(current_user)

    render json: operation.result
  end

  def pay_period
    render json: { pay_period: PayPeriodPresenter.display(@timesheet.pay_period) }
  end

  protected

  def get_timesheet
    @timesheet = current_user.timesheets_dataset[params.require(:id).to_i]
  end
end
