source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'action_policy'
gem 'activerecord-session_store'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'bullet'
gem 'devise'
gem 'i18n-js'
gem 'jbuilder', '~> 2.7'
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'pdf-forms'
gem 'pg', '>= 0.18', '< 2.0'
gem 'pretender'
gem 'puma', '~> 4.1'
gem 'rack-cors', require: 'rack/cors'
gem 'rails', '~> 6.0.3', '>= 6.0.3.3'
gem 'react-rails'
gem 'sass-rails', '>= 6'
gem 'searchkick'
gem 'sendinblue'
gem 'sidekiq-cron', '~> 1.1'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 4.0'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'rspec-rails', ">= 3.9.0"
end

group :development do
  gem 'active_model_serializers', '~> 0.10.4'
  gem 'faker', git: 'https://github.com/faker-ruby/faker.git', branch: 'master'
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
