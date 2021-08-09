module PayrollSchedules
  module List
    module_function

    def call
      presenters = PayrollSchedule.all.map do |schedule|
        PayrollSchedulePresenter.display(schedule)
      end

      Result.new(:ok, presenters)
    end
  end
end
