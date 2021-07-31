class PayrollCategory < Sequel::Model
  many_to_many :users,
    class: "PayrollCategory",
    join_table: :user_categories,
    left_key: :category_id,
    right_key: :user_id
end
