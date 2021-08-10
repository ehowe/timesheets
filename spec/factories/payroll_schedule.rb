FactoryBot.define do
  factory :payroll_schedule do
    length_in_days { 7 }
    start_date     { "08-08-2021" }
    start_time     { "06:30" }
    timezone       { "America/Detroit" }
  end
end
