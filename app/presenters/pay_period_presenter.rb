class PayPeriodPresenter < BasePresenter
  def attributes
    {
      end:            object.end_at.iso8601,
      end_at:         I18n.localize(object.end_at, format: :long),
      id:             object.id,
      length_in_days: object.payroll_schedule.length_in_days,
      start:          object.start_at.iso8601,
      start_at:       I18n.localize(object.start_at, format: :long),
    }
  end
end
