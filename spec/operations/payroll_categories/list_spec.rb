require_relative "../../rails_helper"

describe PayrollCategories::List do
  let!(:category1) { create(:payroll_category, name: "Omega") }
  let!(:category2) { create(:payroll_category, name: "Alpha") }

  it "lists categories in the correct order" do
    expected = [category2, category1].map { |pc| PayrollCategoryPresenter.display(pc) }

    operation = described_class.call
    expect(operation).to be_success
    expect(operation.result).to eq(expected)
  end

  it "lists categories scoped to the user" do
    user = create(:user)

    user.add_payroll_category(category1)

    operation = described_class.(user: user)
    expected  = [
      PayrollCategoryPresenter.display(category1)
    ]

    expect(operation).to be_success
    expect(operation.result).to eq(expected)
  end

  it "returns an error result if an error is encountered" do
    expect(PayrollCategoryPresenter).to receive(:display).and_raise(RuntimeError)

    operation = described_class.call

    expect(operation).not_to be_success
    expect(operation.result).to eq("Unknown error")
  end
end
