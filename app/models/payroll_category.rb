class PayrollCategory < Sequel::Model
  many_to_many :users,
    class: "PayrollCategory",
    join_table: :user_categories,
    left_key: :category_id,
    right_key: :user_id

  def validate
    super
    errors.add(:name, "is required") if name.blank?
    errors.add(:name, "must be unique") if PayrollCategory.where(name: self.name).count > 0
  end
end
