require "rails_helper"

describe PayPeriods::Show do
  let(:admin_user) { create(:user, :admin) }
  let(:user1)      { create(:user) }
  let(:user2)      { create(:user) }
  let(:pay_period) { create(:pay_period) }
  let(:timesheet1) { create(:timesheet, pay_period: pay_period, user: user1) }
  let(:timesheet2) { create(:timesheet, pay_period: pay_period, user: user2) }
  let!(:entry1)    { create(:entry, timesheet: timesheet1) }
  let!(:entry2)    { create(:entry, timesheet: timesheet2) }

  it "describes the complete pay period" do
    operation = described_class.(admin_user: admin_user, id: pay_period.id)

    expect(operation).to be_success

    expect(operation.result["entries"]).to contain_exactly(
      match(**TimesheetEntryPresenter.display(entry1).merge("name" => user1.full_name)),
      match(**TimesheetEntryPresenter.display(entry2).merge("name" => user2.full_name)),
    )
  end
end
