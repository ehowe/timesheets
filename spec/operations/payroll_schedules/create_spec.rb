require_relative "../../rails_helper"

describe PayrollSchedules::Create do
  let(:user) { create(:user) }

  it "cant create a payroll schedule without being an admin" do
    operation = described_class.(user: user, params: { start_on: Time.now.iso8601 })

    expect(operation).not_to be_success
    expect(operation.result).to eq("User is not an admin")
  end

  context "with an admin" do
    let(:user) { create(:user, :admin) }

    it "creates a payroll schedule" do
      start_on   = Time.parse("August 8 2021")
      start_date = start_on.strftime("%m/%d/%Y")
      start_time = start_on.strftime("%H:%M")
      timezone   = "EDT"

      operation = described_class.(user: user, params: { start_date: start_date, start_time: start_time, timezone: timezone, length_in_days: 14 })

      expect(operation).to be_success
      expect(operation.result).to match({
        id:             an_instance_of(Integer),
        length_in_days: 14,
        start_date:     start_date,
        start_day:      "Sunday",
        start_time:     start_time,
        timezone:       timezone,
      })
    end
  end
end
