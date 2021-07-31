class TimesheetsController < AuthenticatedApiController
  def create
    operation = Timesheets::Create.(params.permit(:pay_period_id, :user_id).to_h)

    render json: operation.error, status: 422 and return unless operation.success?

    render json: operation.result, status: :created
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
end
