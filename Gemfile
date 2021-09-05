source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "addressable",   "~> 2.8.0"
gem "devise",        "~> 4.8.0"
gem "jwt",           "~> 2.2.3"
gem "oj",            "~> 3.12.2"
gem "pg",            "~> 1.2.3"
gem "puma",          "~> 5.0"
gem "rails",         "~> 6.1.4"
gem "redis",         "~> 4.4.0"
gem "sequel",        "~> 5.46"
gem "sequel-devise", "~> 0.0.13"
gem "sequel-rails",  "~> 1.1.1"
gem "sidekiq",       "~> 6.2.2"
gem "webpacker",     "~> 5.4.0"

group :development, :test, :cypress do
  gem "awesome_print"
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "dotenv-rails", "~> 2.7.6"
  gem "faraday"
  gem "faraday_middleware"
  gem "factory_bot_rails"
  gem "foreman"
  gem "pry-byebug"
  gem "rubocop"
  gem "rspec-rails"
  gem "rubocop-rspec"
  gem "solargraph"
end

group :development, :cypress do
  gem "listen", "~> 3.3"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
