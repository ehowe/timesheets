require_relative "../../rails_helper"

describe Users::List do
  let!(:admin) { create(:user, :admin) }
  let!(:user)  { create(:user) }

  it "lists users" do
    operation = described_class.(user: admin)

    expect(operation).to be_success
    expect(operation.result).to contain_exactly(UserPresenter.display(admin), UserPresenter.display(user))
  end

  it "does not list users if the user is not an admin" do
    operation = described_class.(user: user)

    expect(operation).not_to be_success
    expect(operation.result).to eq("User is not an admin")
  end
end
