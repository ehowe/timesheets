FactoryBot.define do
  factory :pay_period do
    start_at { Time.new(2021, 8, 8, 6, 30, 0, "-04:00") }
    end_at   { Time.new(2021, 8, 15, 6, 30, 0, "-04:00") }

    payroll_schedule
  end
end
