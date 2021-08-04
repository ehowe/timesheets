class TimesheetEntryPresenter < BasePresenter
  include ActionView::Helpers::DateHelper

  def attributes
    {
      category: object.payroll_category.name,
      end_at:   I18n.localize(object.end_at, format: :short),
      id:       object.id,
      start_at: I18n.localize(object.start_at, format: :short),
      length:   distance_of_time_in_words(object.start_at, object.end_at),
    }
  end
end
