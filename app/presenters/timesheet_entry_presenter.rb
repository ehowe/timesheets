class TimesheetEntryPresenter < BasePresenter
  def attributes
    {
      category: object.payroll_category.name,
      end_at:   I18n.localize(object.end_at, format: :short),
      id:       object.id,
      start_at: I18n.localize(object.start_at, format: :short),
    }
  end
end
