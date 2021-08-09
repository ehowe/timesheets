module PayrollSchedules
  module Create
    module_function

    def call(user:, params:)
      return Result.new(:error, "User is not an admin") unless user.admin

      PayrollSchedule.db.transaction do
        begin
          schedule = PayrollSchedule.create(params)

          return Result.new(:ok, PayrollSchedulePresenter.display(schedule))
        rescue => e
          return Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
