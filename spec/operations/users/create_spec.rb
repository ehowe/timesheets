require_relative "../../rails_helper"

describe Users::Create do
  let(:admin)        { create(:user, :admin) }
  let(:valid_params) { { email: "test@example.com", password: "pass", password: "confirmation", first_name: "First", last_name: "Last" } }
  let(:mailer)       { double("ActionMailer::Parameterized::Mailer") }

  it "creates a user" do
    expect(described_class).to receive(:send_mail).and_return(true)

    operation = described_class.(admin_user: admin, params: valid_params)

    expect(operation).to be_success
    expect(operation.result).to match(a_hash_including(email: valid_params[:email]))
  end

  it "aborts if the user is not an admin" do
    operation = described_class.(admin_user: create(:user), params: valid_params)

    expect(operation).not_to be_success

    expect(operation.result).to eq("User is not an admin")
  end
end
