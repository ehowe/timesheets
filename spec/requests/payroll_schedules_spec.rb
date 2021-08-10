require_relative "../rails_helper"

describe "Payroll schedule requests" do
  let(:path)         { "/api/admin/payroll_schedules" }
  let(:valid_params) { { payroll_schedule: { start_date: "01-01-2021", start_time: "1:00", timezone: "America/Detroit", length_in_days: 7 } } }
  let(:user)         { create(:user, :admin) }

  before(:each) { authenticate_user(user) }

  it "creates a schedule" do
    expect do
      post(path, body: valid_params.merge(token: user.token))
    end.to change { PayrollSchedule.count }.by(1)
  end

  shared_examples_for "listing schedules" do
    let!(:schedule) { create(:payroll_schedule) }

    it "lists schedules" do
      get(path, params: { token: user.token })

      expect(response.body).to match("payroll_schedules" => contain_exactly(PayrollSchedulePresenter.display(schedule)))
    end
  end

  include_examples "listing schedules"

  context "and the user is not an admin" do
    let(:user) { create(:user) }

    it "cannot create a payroll schedule" do
      expect do
        post(path, body: valid_params.merge(token: user.token))
      end.not_to change { PayrollSchedule.count }

      expect(response.status).to eq(404)
    end

    context "with the non-admin path" do
      let(:path) { "/api/payroll_schedules" }

      include_examples "listing schedules"

      it "cannot create a payroll schedule" do
        expect do
          post(path, body: valid_params.merge(token: user.token))
        end.to raise_error(ActionController::RoutingError)
      end
    end
  end
end
