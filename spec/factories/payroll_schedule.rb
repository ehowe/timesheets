FactoryBot.define do
  factory :payroll_schedule do
    length_in_days { 7 }
    start_date     { "08-09-2021" }
    start_time     { "07:00" }
    timezone       { "America/Detroit" }
  end
end
