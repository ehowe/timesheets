FactoryBot.define do
  factory :timesheet_entry, aliases: [:entry] do
    start_at { Time.new(2021, 8, 1, 6, 30, 0, "-04:00") }
    end_at   { Time.new(2021, 8, 1, 18, 30, 0, "-04:00") }

    payroll_category { PayrollCategory.first || create(:payroll_category) }
    timesheet
  end
end
