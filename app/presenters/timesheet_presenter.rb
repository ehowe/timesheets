class TimesheetPresenter < BasePresenter
  def attributes
    {
      id:   object.id,
      name: name,
    }
  end

  def pay_period
    object.pay_period
  end

  def name
    "#{I18n.localize(pay_period.start_at, format: :long)} - #{I18n.localize(pay_period.end_at, format: :long)}"
  end
end
