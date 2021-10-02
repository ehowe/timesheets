module PayPeriods
  module Show
    module_function

    def call(admin_user:, id:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      pay_period = PayPeriod
        .order(:start_at)
        .eager(timesheets: [:user, { entries: :payroll_category }])[id.to_i]

      Result.new(:ok, AdminPayPeriodPresenter.display(pay_period))
    end
  end
end
