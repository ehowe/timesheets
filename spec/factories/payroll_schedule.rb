FactoryBot.define do
  factory :payroll_schedule do
    length_in_days { 7 }
    start_date     { "01-07-2021" } # DD-MM-YYYY
    start_time     { "06:30" }
    timezone       { "America/Detroit" }
  end
end
