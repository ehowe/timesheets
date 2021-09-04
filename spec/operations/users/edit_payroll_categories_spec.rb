require_relative "../../rails_helper"

describe Users::EditPayrollCategories do
  let(:admin)    { create(:user, :admin) }
  let(:user)     { create(:user) }
  let(:category) { create(:payroll_category) }

  it "adds a category" do
    categories = [ category ]

    expected = PayrollCategoryPresenter.display(category)

    expect do
      operation = described_class.(admin_user: admin, user_id: user.id, categories: categories)

      expect(operation).to be_success
      expect(operation.result).to contain_exactly(expected)
    end.to change { user.payroll_categories_dataset.count }.by(1)
  end

  it "doesnt error if the category already exists" do
    user.add_payroll_category(category)

    categories = [ category ]

    expected = PayrollCategoryPresenter.display(category)

    expect do
      operation = described_class.(admin_user: admin, user_id: user.id, categories: categories)

      expect(operation).to be_success
      expect(operation.result).to contain_exactly(expected)
    end.not_to change { user.payroll_categories_dataset.count }
  end

  it "removes a category" do
    user.add_payroll_category(category)

    categories = []

    expect do
      operation = described_class.(admin_user: admin, user_id: user.id, categories: categories)

      expect(operation).to be_success
      expect(operation.result).to be_empty
    end.to change { user.payroll_categories_dataset.count }.by(-1)
  end

  it "aborts if the user is not an admin" do
    operation = described_class.(admin_user: user, user_id: user.id, categories: [])

    expect(operation).not_to be_success
    expect(operation.result).to eq("User is not an admin")
  end

  it "aborts if the user cant be found" do
    operation = described_class.(admin_user: admin, user_id: -1, categories: [])

    expect(operation).not_to be_success
    expect(operation.result).to eq("User not found")
  end
end
