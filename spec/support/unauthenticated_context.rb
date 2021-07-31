RSpec.shared_context "unauthenticated request", shared_context: :metadata do
  let(:user) { create(:user) }

  it "returns a 401 with valid params but no JWT" do
    post(path, params: valid_params)

    expect(response.status).to eq(401)
  end
end
