require_relative "../../rails_helper"

describe TimesheetEntries::List do
  let(:user) { create(:user) }

  it "lists a timesheets entries" do
    timesheet = create(:timesheet, user: user)
    entry     = create(:timesheet_entry, timesheet: timesheet)

    other_timesheet = create(:timesheet) # This one has a different user and doesnt show up in the response
    create(:timesheet_entry, timesheet: other_timesheet)

    expect(described_class.(user, timesheet).result[:entries]).to contain_exactly(TimesheetEntryPresenter.display(entry))
  end
end
