class PayrollCategoryPresenter < BasePresenter
  def attributes
    {
      id:   object.id,
      name: object.name,
    }
  end
end
