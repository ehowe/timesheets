class User < Sequel::Model
  plugin :devise

  devise :database_authenticatable, :recoverable

  many_to_many :payroll_categories,
    class: "PayrollCategory",
    join_table: :user_categories,
    left_key: :user_id,
    right_key: :category_id

  one_to_many :timesheets

  def make_admin!
    update(admin: true)
  end

  def revoke_admin!
    update(admin: false)
  end
end
