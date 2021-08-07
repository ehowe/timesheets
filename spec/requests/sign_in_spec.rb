require_relative "../rails_helper"

describe "Signing in", type: :request do
  let(:user) { create(:user) }

  it "signs in the user" do
    post("/api/users/sign_in", body: { user: { email: user.email, password: "pass" } })

    expect(response.status).to eq(201)
    expect(response.body["id"]).to eq(user.id)
  end

  it "fails to signin with an incorrect password" do
    post("/api/users/sign_in", body: { user: { email: user.email, password: "wrong" } }, headers: { "Accept" => "application/json" })

    expect(response.status).to eq(401)
  end
end
