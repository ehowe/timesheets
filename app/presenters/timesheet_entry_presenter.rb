class TimesheetEntryPresenter < BasePresenter
  include ActionView::Helpers::DateHelper

  def attributes
    {
      category:        object.payroll_category.name,
      end_at:          I18n.localize(object.end_at, format: :short),
      id:              object.id,
      length:          distance_of_time_in_words(object.start_at, object.end_at),
      length_in_hours: (object.end_at - object.start_at) / 1.hours.to_f,
      start_at:        I18n.localize(object.start_at, format: :short),
    }
  end
end
