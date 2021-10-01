class Admin::PayPeriodsController < AdminController
  def index
    operation = PayPeriods::List.call(admin_user: current_user)

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { pay_periods: operation.result }
  end

  def show
    operation = PayPeriods::Show.call(admin_user: current_user, id: params.require(:id))

    unless operation.success?
      render json: operation.result, status: 422 and return
    end

    render json: { pay_period: operation.result }
  end
end
