require_relative "../../rails_helper"

describe PayrollSchedules::GetPayPeriods do
  let!(:payroll_schedule) { create(:payroll_schedule) }

  it "creates and returns pay periods" do
    expect do
      operation = described_class.(payroll_schedule: payroll_schedule, number: 5)
      result    = operation.result

      expect(operation).to be_success

      latest   = operation.result.first
      start_at = Time.parse(latest["start_at"])
      end_at   = Time.parse(latest["end_at"])

      expect(Time.now).to be_between(start_at, end_at)

      expect(result.count).to eq(5)
    end.to change { PayPeriod.count }.by(7)
  end

  it "returns existing pay periods the second time" do
    expect do
      described_class.(payroll_schedule: payroll_schedule, number: 5)
    end.to change { PayPeriod.count }.by(7)

    expect do
      operation = described_class.(payroll_schedule: payroll_schedule, number: 5)
      result    = operation.result

      expect(operation).to be_success
      expect(result.count).to eq(5)
    end.not_to change { PayPeriod.count }
  end
end
