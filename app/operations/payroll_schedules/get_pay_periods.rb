module PayrollSchedules
  module GetPayPeriods
    module_function

    def call(payroll_schedule:, number:)
      payroll_schedule_start = iterator = payroll_schedule.parsed_time_in_zone
      now_in_timezone        = Time.now.in_time_zone(payroll_schedule.timezone)

      insert_args = []
      select_args = { start_at: [], end_at: [], payroll_schedule_id: payroll_schedule.id }

      until iterator > now_in_timezone
        next_iterator = iterator + payroll_schedule.length_in_days.days

        insert_args << { start_at: iterator, end_at: next_iterator, payroll_schedule_id: payroll_schedule.id }
        select_args[:start_at] << iterator
        select_args[:end_at] << iterator

        iterator = next_iterator
      end

      PayPeriod.dataset.insert_conflict.multi_insert(insert_args)

      pay_periods = PayPeriod.by_end_at_desc.where(select_args).limit(number)

      Result.new(:ok, pay_periods.map { |p| PayPeriodPresenter.display(p) })
    end
  end
end
