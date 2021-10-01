class AdminPayPeriodPresenter < BasePresenter
  def attributes
    {
      end_at:   end_at,
      entries:  entries,
      start_at: start_at,
    }
  end

  def start_at
    I18n.localize(object.start_at, format: :dateAndTime)
  end

  def end_at
    I18n.localize(object.end_at, format: :dateAndTime)
  end

  def entries
    object.timesheets.flat_map do |timesheet|
      timesheet.entries.map do |entry|
        TimesheetEntryPresenter.display(entry).merge(
          name: timesheet.user.full_name,
        )
      end
    end
  end
end
