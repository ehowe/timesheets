user_data = [{:first_name=>"Daniel", :last_name=>"Kassulke", :email=>"galen.feest@borer.co", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Harmony", :last_name=>"Funk", :email=>"calvin_gusikowski@ortiz.name", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Mel", :last_name=>"Bartell", :email=>"kenneth@boyle-ortiz.com", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Genevie", :last_name=>"Cartwright", :email=>"gertha@lindgren.info", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Heath", :last_name=>"Kovacek", :email=>"adeline@kuphal.co", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Mack", :last_name=>"Quitzon", :email=>"johnson.kris@daugherty.net", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Michael", :last_name=>"Baumbach", :email=>"geraldo.greenholt@heller-wolf.com", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Brendan", :last_name=>"Conn", :email=>"steve@kling-cartwright.net", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Rosaria", :last_name=>"Torphy", :email=>"chang@dare.com", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Devin", :last_name=>"Koss", :email=>"georgene@moen.info", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Elenor", :last_name=>"Green", :email=>"forest@muller-langosh.io", :password=>"asdf", :password_confirmation=>"asdf"}, {:first_name=>"Wilmer", :last_name=>"Beier", :email=>"lona.kertzmann@langosh.org", :password=>"asdf", :password_confirmation=>"asdf"}]

User.db.transaction do
  users = user_data.map { |d| User.where(email: d[:email]).first || User.create(d) }

  category_names = ["EMT", "Paramedic"]

  categories = category_names.map { |cat| PayrollCategory.where(name: cat).first || PayrollCategory.create(name: cat) }

  users.each_with_index do |user, index|
    next unless user.payroll_categories.empty?
    index % 2 == 0 ? user.add_payroll_category(categories.first) : user.add_payroll_category(categories.last)
  end

  users = User.where(email: user_data.map { |data| data[:email] })

  schedule_start = Time.now.beginning_of_week + 6.hours + 30.minutes - 14.days
  schedule_end   = schedule_start + 14.days

  payroll_schedule = PayrollSchedule.find_or_create(start_date: schedule_start.strftime("%m-%d-%Y"), start_time: schedule_start.strftime("%H:%M"), timezone: "America/Detroit", length_in_days: 14)

  pay_period  = PayPeriod.find_or_create(start_at: schedule_start, end_at: schedule_end, payroll_schedule_id: payroll_schedule.id)

  timesheets = users.map do |user|
    Timesheet.find_or_create(user_id: user.id, pay_period_id: pay_period.id)
  end

  entries = ((schedule_end - schedule_start) / 12.hours).to_i.times.map { |t| { start_at: schedule_start + (t * 12.hours), end_at: (schedule_start + (t * 12.hours)) + 12.hours } }

  entries.each do |entry|
    sheets = timesheets.sample(4)

    sheets.each do |timesheet|
      TimesheetEntry.create(entry.merge(timesheet_id: timesheet.id, payroll_category_id: timesheet.user.payroll_categories.first.id))
    end
  end
end
