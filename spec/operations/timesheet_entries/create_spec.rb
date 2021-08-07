require_relative "../../rails_helper"

describe TimesheetEntries::Create do
  let(:timesheet)    { create(:timesheet) }
  let(:category)     { create(:payroll_category) }
  let(:start_at)     { Time.new(2021, 8, 1, 6, 30, 0, "-04:00").iso8601 }
  let(:end_at)       { Time.new(2021, 8, 1, 18, 30, 0, "-04:00").iso8601 }
  let(:valid_params) { { timesheet_id: timesheet.id, payroll_category_id: category.id, start_at: start_at, end_at: end_at } }
  let(:user)         { timesheet.user }

  it "creates a timesheet entry" do
    expect do
      described_class.(user: user, params: valid_params)
    end.to change { timesheet.entries_dataset.count }.by(1)
  end

  it "does not create a timesheet if the user is wrong" do
    expect do
      result = described_class.(user: create(:user), params: valid_params)

      expect(result.result).to eq("Timesheet not found")
    end.not_to change { TimesheetEntry.count }
  end

  context "validations" do
    shared_examples_for "missing attribute" do |attribute|
      it "does not create a new entry with missing #{attribute}" do
        expect do
          result = described_class.(user: user, params: valid_params.except(attribute))
          expect(result.result).to eq("#{attribute} is required")
        end.not_to change { TimesheetEntry.dataset.count }
      end
    end

    include_examples "missing attribute", :timesheet_id
    include_examples "missing attribute", :payroll_category_id
    include_examples "missing attribute", :start_at
    include_examples "missing attribute", :end_at
  end
end
