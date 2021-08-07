require_relative "../rails_helper"

describe "Timesheet requests" do
  let(:path)         { "/api/users/#{user.id}/timesheets" }
  let(:pay_period)   { create(:pay_period) }
  let(:valid_params) { { timesheet: { pay_period_id: pay_period.id } } }
  let(:user)         { create(:user) }

  context "authenticated" do
    before(:each) { authenticate_user(user) }

    it "creates a timesheet" do
      expect do
        post(path, body: valid_params.merge(token: user.token))
      end.to change { user.timesheets_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    it "cannot create a duplicate timesheet" do
      expect do
        post(path, body: valid_params.merge(token: user.token))
        post(path, body: valid_params.merge(token: user.token))
      end.to change { user.timesheets_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    context "with a timesheet" do
      let!(:timesheet) { create(:timesheet, user: user) }

      it "lists timesheets" do
        get(path, params: { token: user.token })

        expect(response.body).to match(
          a_hash_including(
            "sheets" => contain_exactly(TimesheetPresenter.display(timesheet).stringify_keys)
          )
        )
      end
    end
  end

  include_context "unauthenticated request"
end
