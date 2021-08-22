User.where(first_name: "Test", last_name: "User").first || User.create(first_name: "Test", last_name: "User", email: "test@test.com", password: "asdf", password_confirmation: "asdf")

User.where(admin: true).first || User.create(first_name: "Admin", last_name: "User", email: "admin@test.com", password: "asdf", password_confirmation: "asdf", admin: true)

payroll_schedule = PayrollSchedule.find_or_create(start_date: "01-01-2021", start_time: "07:00", timezone: "America/Detroit", length_in_days: 7)

payroll_category = PayrollCategory.find_or_create(name: "Test category")
