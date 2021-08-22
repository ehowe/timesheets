require_relative "../rails_helper"

describe "Timesheet Entry requests" do
  let(:timesheet)    { create(:timesheet, user: user) }
  let(:category)     { create(:payroll_category) }
  let(:start_at)     { Time.new(2021, 8, 1, 6, 30, 0, "-04:00").iso8601 }
  let(:end_at)       { Time.new(2021, 8, 1, 18, 30, 0, "-04:00").iso8601 }
  let(:valid_params) { { entry: { payroll_category_id: category.id, start_at: start_at, end_at: end_at }, token: user.token } }
  let(:path)         { "/api/timesheets/#{timesheet.id}/entries" }
  let(:user)         { create(:user) }

  context "authenticated" do
    before(:each) { authenticate_user(user) }

    it "creates an entry" do
      expect do
        post(path, body: valid_params)
      end.to change { timesheet.entries_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    it "does not create duplicate entries" do
      expect do
        post(path, body: valid_params)
        post(path, body: valid_params)
      end.to change { timesheet.entries_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end
  end

  include_context "unauthenticated request"
end
