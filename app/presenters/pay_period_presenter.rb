class PayPeriodPresenter < BasePresenter
  def attributes
    {
      end_at:   I18n.localize(object.end_at, format: :long),
      id:       object.id,
      start_at: I18n.localize(object.start_at, format: :long),
    }
  end
end
