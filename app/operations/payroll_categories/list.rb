module PayrollCategories
  module List
    module_function

    def call(user: nil)
      categories = if user
                     user.payroll_categories
                   else
                     PayrollCategory.order(:name).all
                   end

      Result.new(:ok, categories.map { |pc| PayrollCategoryPresenter.display(pc) })
    rescue
      return Result.new(:error, "Unknown error")
    end
  end
end
