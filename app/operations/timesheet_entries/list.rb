module TimesheetEntries
  module List
    module_function

    # TODO: Pagination probably
    def call(user, timesheet)
      return [] unless user.timesheets_dataset.select_map(:id).include?(timesheet.id)

      # Reload to eager load associations
      timesheet = Timesheet
        .where(id: timesheet.id)
        .eager(entries: :payroll_category)
        .all
        .first

      entries = timesheet.entries.map do |entry|
        TimesheetEntryPresenter.display(entry)
      end

      Result.new(:ok, { entries: entries })
    end
  end
end
