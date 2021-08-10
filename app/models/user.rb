class User < Sequel::Model
  dataset_module do
    def order_by_last_name
      order(:last_name)
    end
  end

  plugin :devise

  devise :database_authenticatable, :recoverable, :registerable, :lockable

  many_to_many :payroll_categories,
    class: "PayrollCategory",
    join_table: :user_categories,
    left_key: :user_id,
    right_key: :category_id

  one_to_many :timesheets,
    dataset: -> { Timesheet.order_by_desc_pay_period_end.where(user_id: id) }

  def active_for_authentication?
    super && !locked
  end

  def validate
    super

    errors.add(:email, "must be unique") if new? && User.where(email: self.email).count > 0
  end

  def make_admin!
    update(admin: true)
  end

  def revoke_admin!
    update(admin: false)
  end
end
