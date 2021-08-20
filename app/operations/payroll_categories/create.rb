module PayrollCategories
  module Create
    module_function

    def call(admin_user:, params:)
      return Result.new(:error, "User is not an admin") unless admin_user.admin

      PayrollCategory.db.transaction do
        begin
          payroll_category = PayrollCategory.create(params)

          return Result.new(:ok, PayrollCategoryPresenter.display(payroll_category))
        rescue Sequel::ValidationFailed => e
          return Result.new(:error, e.message)
        rescue
          return Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
