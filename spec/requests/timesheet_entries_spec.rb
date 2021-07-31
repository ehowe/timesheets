require_relative "../rails_helper"

describe "Timesheet Entry requests" do
  let(:timesheet)    { create(:timesheet) }
  let(:category)     { create(:payroll_category) }
  let(:start_at)     { Time.new(2021, 8, 1, 6, 30, 0, "-04:00").iso8601 }
  let(:end_at)       { Time.new(2021, 8, 1, 18, 30, 0, "-04:00").iso8601 }
  let(:valid_params) { { timesheet_id: timesheet.id, payroll_category_id: category.id, start_at: start_at, end_at: end_at } }
  let(:path)         { "/api/users/#{user.id}/timesheets/#{timesheet.id}/entries" }

  context "authenticated" do
    let(:user)  { create(:user, :with_jwt) }
    let(:token) { user.token }

    it "creates an entry" do
      expect do
        post(path, params: valid_params)
      end.to change { timesheet.entries_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end

    it "does not create duplicate entries" do
      expect do
        post(path, params: valid_params)
        post(path, params: valid_params)
      end.to change { timesheet.entries_dataset.count }.by(1)

      expect(response.status).to eq(201)
    end
  end

  include_context "unauthenticated request"
end
