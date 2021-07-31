source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.0.2"

gem "devise",        "~> 4.8.0"
gem "jwt",           "~> 2.2.3"
gem "oj",            "~> 3.12.2"
gem "pg",            "~> 1.2.3"
gem "puma",          "~> 5.0"
gem "rails",         "~> 6.1.4"
gem "sequel",        "~> 5.46"
gem "sequel-devise", "~> 0.0.13"
gem "sequel-rails",  "~> 1.1.1"
gem "webpacker",     "~> 5.4.0"

group :development, :test do
  gem "awesome_print"
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "faraday"
  gem "faraday_middleware"
  gem "factory_bot_rails"
  gem "pry-byebug"
  gem "rubocop"
  gem "rspec-rails"
  gem "rubocop-rspec"
end

group :development do
  gem "listen", "~> 3.3"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
