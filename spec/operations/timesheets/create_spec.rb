require_relative "../../rails_helper"

describe Timesheets::Create do
  let(:user)       { create(:user) }
  let(:pay_period) { create(:pay_period) }

  it "creates a new timesheet" do
    expect do
      described_class.(user_id: user.id, pay_period_id: pay_period.id)
    end.to change { user.timesheets_dataset.count }.by(1)
  end

  it "does not create a new timesheet with a nil user" do
    expect do
      result = described_class.(pay_period_id: pay_period.id)
      expect(result.result).to eq("user_id is required")
    end.not_to change { Timesheet.dataset.count }
  end

  it "does not create a new timesheet with a nil pay period" do
    expect do
      result = described_class.(user_id: user.id)
      expect(result.result).to eq("pay_period_id is required")
    end.not_to change { Timesheet.dataset.count }
  end
end
