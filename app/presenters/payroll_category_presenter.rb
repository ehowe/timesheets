class PayrollCategoryPresenter < BasePresenter
  def attributes
    {
      name: object.name,
    }
  end
end
