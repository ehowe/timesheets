require_relative "../../rails_helper"

describe Timesheets::List do
  let(:user) { create(:user) }

  it "lists a users timesheets" do
    timesheet = create(:timesheet, user: user)
    create(:timesheet) # This one has a different user and doesnt show up in the response

    expect(described_class.(user).result[:sheets]).to contain_exactly(TimesheetPresenter.display(timesheet))
  end
end
