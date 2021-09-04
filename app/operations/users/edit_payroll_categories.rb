module Users
  module EditPayrollCategories
    module_function

    def call(admin_user:, user_id:, categories:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      user = User[user_id.to_i]

      return Result.new(:error, "User not found") unless user

      rows = categories.map do |category|
        { user_id: user.id, category_id: category[:id] }
      end

      user.db.transaction do
        begin
          user.db[:user_categories].insert_conflict.multi_insert(rows)

          categories_to_remove = user.payroll_categories_dataset.exclude(category_id: rows.map { |r| r[:category_id] }).all

          categories_to_remove.each do |category|
            user.remove_payroll_category(category)
          end

          return PayrollCategories::List.(user: user)
        rescue => e
          return Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
