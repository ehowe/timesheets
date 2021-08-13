require_relative "../rails_helper"

describe UserSignupMailer do
  describe "reset_password_instructions" do
    let!(:user)  { create(:user) }
    let!(:token) { user.send(:set_reset_password_token) }
    let(:mail)   { described_class.with(user: user, token: token).reset_password_instructions }

    before(:each) { allow(user).to receive(:password_edit_url).and_return("https://example.com") }

    it "renders the headers" do
      expect(mail.subject).to eq("Welcome!")
      expect(mail.to).to eq([user.email])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Someone has requested a link to change your password")
      expect(mail.body.encoded).to match("Hello #{user.email}")
    end
  end
end
