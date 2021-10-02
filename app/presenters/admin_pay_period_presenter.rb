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
          end_at:   I18n.localize(entry.end_at, format: :dateAndTime),
          name:     timesheet.user.full_name,
          start_at: I18n.localize(entry.start_at, format: :dateAndTime),
        )
      end
    end
  end
end
