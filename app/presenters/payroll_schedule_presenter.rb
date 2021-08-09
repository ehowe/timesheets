class PayrollSchedulePresenter < BasePresenter
  include ActionView::Helpers::DateHelper

  def attributes
    {
      id:             object.id,
      length_in_days: object.length_in_days,
      start_date:     object.start_date,
      start_day:      Date.parse(object.start_date).strftime("%A"),
      start_time:     object.start_time,
      timezone:       object.timezone,
    }
  end
end
