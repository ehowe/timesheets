module PayPeriods
  module List
    module_function

    def call(admin_user:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      pay_periods = PayPeriod.by_end_at_desc.eager(:payroll_schedule).all

      Result.new(:ok, pay_periods.map { |p| PayPeriodPresenter.display(p) })
    end
  end
end
