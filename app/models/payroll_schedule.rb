class PayrollSchedule < Sequel::Model
  one_to_many :pay_periods

  def parsed_time_in_zone
    Time.parse("#{start_date} #{start_time} #{utc_offset}")
  end

  def utc_offset
    offset = Time.now.in_time_zone(timezone).formatted_offset
  end
end
