require_relative "../../rails_helper"

describe Timesheets::Create do
  let(:user)       { create(:user) }
  let(:pay_period) { create(:pay_period) }

  it "creates a new timesheet" do
    expect do
      described_class.(user: user, params: { pay_period_id: pay_period.id })
    end.to change { user.timesheets_dataset.count }.by(1)
  end

  it "does not create a new timesheet with a nil pay period" do
    expect do
      result = described_class.(user: user, params: {})
      expect(result.result).to eq("pay_period_id is required")
    end.not_to change { Timesheet.dataset.count }
  end
end
