require_relative "../../rails_helper"

describe PayrollCategories::Create do
  let(:admin)        { create(:user, :admin) }
  let(:valid_params) { { name: "Payroll Category" } }

  it "creates a new payroll category" do
    operation = described_class.(admin_user: admin, params: valid_params)

    expect(operation).to be_success
    expect(operation.result).to match(id: an_instance_of(Integer), name: "Payroll Category")
  end

  it "aborts if the user is not an admin" do
    operation = described_class.(admin_user: create(:user), params: valid_params)

    expect(operation).not_to be_success
    expect(operation.result).to eq("User is not an admin")
  end

  it "aborts if the name is not unique" do
    described_class.(admin_user: admin, params: valid_params)
    operation = described_class.(admin_user: admin, params: valid_params)

    expect(operation).not_to be_success
    expect(operation.result).to eq("name must be unique")
  end
end
