# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  address:              ENV["SMTP_HOST"],
  authentication:       :plain,
  domain:               ENV["SMTP_DOMAIN"],
  enable_starttls_auto: true,
  password:             ENV["SMTP_PASSWORD"],
  port:                 587,
  user_name:            ENV["SMTP_USER"],
}
