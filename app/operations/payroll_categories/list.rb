module PayrollCategories
  module List
    module_function

    def call
      categories = PayrollCategory.order(:name).all.map { |pc| PayrollCategoryPresenter.display(pc) }

      Result.new(:ok, categories)
    rescue
      return Result.new(:error, "Unknown error")
    end
  end
end
