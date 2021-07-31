require_relative "../rails_helper"

describe "Timesheet requests" do
  let(:path)         { "/api/users/#{user.id}/timesheets" }
  let(:pay_period)   { create(:pay_period) }
  let(:valid_params) { { pay_period_id: pay_period.id, user_id: user.id } }

  context "authenticated" do
    let(:user)         { create(:user, :with_jwt) }
    let(:token)        { user.token }

    it "creates a timesheet" do
      expect do
        post(path, params: valid_params)
      end.to change { user.timesheets_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    it "cannot create a duplicate timesheet" do
      expect do
        post(path, params: valid_params)
        post(path, params: valid_params)
      end.to change { user.timesheets_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    context "with a timesheet" do
      let!(:timesheet) { create(:timesheet, user: user) }

      it "lists timesheets" do
        get(path)

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
