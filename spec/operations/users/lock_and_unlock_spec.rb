require_relative "../../rails_helper"

describe Users::LockAndUnlock do
  let(:admin) { create(:user, :admin) }
  let(:user)  { create(:user) }

  it "locks and unlocks a user" do
    expect do
      described_class.(admin_user: admin, user_id: user.id, action: "lock")
    end.to change { user.refresh.locked_at }.from(nil)

    expect do
      described_class.(admin_user: admin, user_id: user.id, action: "unlock")
    end.to change { user.refresh.locked_at }.to(nil)
  end

  it "fails to lock the admin user" do
    expect do
      operation = described_class.(admin_user: admin, user_id: admin.id, action: "lock")

      expect(operation).not_to be_success
      expect(operation.result).to eq("User cannot change their own lock status")
    end.not_to change { admin.refresh.locked_at }
  end

  it "fails to change the lock status if the admin user is not an admin" do
    expect do
      operation = described_class.(admin_user: user, user_id: user.id, action: "lock")

      expect(operation).not_to be_success
      expect(operation.result).to eq("User is not an admin")
    end.not_to change { user.refresh.locked_at }
  end

  it "aborts if the action is invalid" do
    expect do
      operation = described_class.(admin_user: admin, user_id: user.id, action: "invalid")

      expect(operation).not_to be_success
      expect(operation.result).to eq("Invalid action")
    end.not_to change { user.refresh.locked_at }
  end

  it "aborts with an invalid user id" do
    operation = described_class.(admin_user: admin, user_id: -1, action: "lock")

    expect(operation).not_to be_success
    expect(operation.result).to eq("User not found")
  end
end
