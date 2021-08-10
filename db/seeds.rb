user = User.where(first_name: "Test", last_name: "User").first || User.create(first_name: "Test", last_name: "User", email: "test@test.com", password: "asdf", password_confirmation: "asdf")

payroll_schedule = PayrollSchedule.find_or_create(start_date: "01-01-2021", start_time: "07:00", timezone: "America/Detroit")

pay_period = PayPeriod.find_or_create(start_at: Time.new(2021, 8, 1, 6, 30, 0, "-04:00"), end_at: Time.new(2021, 8, 15, 6, 30, 0, "-04:00"), payroll_schedule_id: payroll_schedule_id: payroll_schedule.id)

category = PayrollCategory.find_or_create(name: "Truck")

user.payroll_categories.include?(category) || user.add_payroll_category(category)

sheet = Timesheet.find_or_create(user_id: user.id, pay_period_id: pay_period.id)

entry = TimesheetEntry.find_or_create(start_at: Time.new(2021, 8, 1, 6, 30, 0, "-04:00"), end_at: Time.new(2021, 8, 1, 18, 30, 0, "-04:00"), payroll_category_id: category.id, timesheet_id: sheet.id)
