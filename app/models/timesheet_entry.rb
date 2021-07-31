class TimesheetEntry < Sequel::Model(:timesheet_entries)
  many_to_one :timesheet
  many_to_one :payroll_category, class: "PayrollCategory", key: :payroll_category_id

  def validate
    super
    errors.add(:end_at, "is required")              if end_at.blank?
    errors.add(:payroll_category_id, "is required") if payroll_category_id.blank?
    errors.add(:start_at, "is required")            if start_at.blank?
    errors.add(:timesheet_id, "is required")        if timesheet_id.blank?
  end
end
