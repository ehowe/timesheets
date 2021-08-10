module PayrollSchedules
  module GetDateRanges
    module_function

    def call(payroll_schedule:, number:)
      payroll_schedule_start = iterator = payroll_schedule.parsed_time_in_zone
      now_in_timezone        = Time.now.in_time_zone(payroll_schedule.timezone)

      ranges = []

      until iterator > now_in_timezone
        next_iterator = iterator + payroll_schedule.length_in_days.days
        ranges << "#{I18n.localize(iterator, format: :long)} - #{I18n.localize(next_iterator, format: :long)}"

        iterator = next_iterator
      end

      Result.new(:ok, ranges.reverse[0..(number - 1)])
    end
  end
end
