require_relative "../../rails_helper"

describe TimesheetEntries::Create do
  let(:timesheet)    { create(:timesheet) }
  let(:category)     { create(:payroll_category) }
  let(:start_at)     { Time.new(2021, 8, 9, 6, 30, 0, "-04:00") }
  let(:end_at)       { Time.new(2021, 8, 9, 18, 30, 0, "-04:00") }
  let(:valid_params) { { timesheet_id: timesheet.id, payroll_category_id: category.id, start_at: start_at.iso8601, end_at: end_at.iso8601 } }
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

  it "does not create a duplicate entry" do
    expect do
      described_class.(user: user, params: valid_params)
    end.to change { timesheet.entries_dataset.count }.by(1)

    expect do
      described_class.(user: user, params: valid_params)
    end.not_to change { timesheet.entries_dataset.count }
  end

  it "does not create an entry outside the window of the pay period" do
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

    shared_examples_for "iso8601 date" do |attribute|
      it "does not create a new entry with invalid #{attribute}" do
        expect do
          result = described_class.(user: user, params: valid_params.merge(attribute => "invalid"))
          expect(result.result).to eq("#{attribute} should be iso8601 formatted date")
        end.not_to change { TimesheetEntry.dataset.count }
      end
    end

    include_examples "missing attribute", :timesheet_id
    include_examples "missing attribute", :payroll_category_id
    include_examples "missing attribute", :start_at
    include_examples "missing attribute", :end_at
    include_examples "iso8601 date",      :start_at
    include_examples "iso8601 date",      :end_at

    it "does not create an entry with a start_date outside of the pay period" do
      expect do
        result = described_class.(user: user, params: valid_params.merge(start_at: (start_at - 7.days).iso8601))
        expect(result.result).to eq("Start date is outside pay period")
      end.not_to change { TimesheetEntry.dataset.count }

      expect do
        result = described_class.(user: user, params: valid_params.merge(start_at: (start_at + 7.days).iso8601))
        expect(result.result).to eq("Start date is outside pay period")
      end.not_to change { TimesheetEntry.dataset.count }
    end
  end
end
