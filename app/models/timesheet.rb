class Timesheet < Sequel::Model
  dataset_module do
    def order_by_desc_pay_period_end
      association_join(:pay_period)
        .order(Sequel.desc(Sequel[:pay_period][:end_at]))
        .qualify
    end
  end

  many_to_one :user
  many_to_one :pay_period

  one_to_many :entries, class: "TimesheetEntry", order: :start_at

  def validate
    super
    errors.add(:user_id, "is required") if user_id.blank?
    errors.add(:pay_period_id, "is required") if pay_period_id.blank?
  end
end
