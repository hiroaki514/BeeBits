# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2'

gem 'bootsnap', require: false
gem 'bootstrap', '~> 5.3.3'
gem 'devise'
gem 'devise-i18n'
gem 'importmap-rails'
gem 'jbuilder'
gem 'jsonapi-serializer'
gem 'mysql2', '~> 0.5'
gem 'puma', '~> 6.5'
gem 'rack-cors'
gem 'rails', '~> 8.0.0'
gem 'sassc-rails'
gem 'seed-fu'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'whenever', require: false

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'rspec-rails', '~> 7.1.0'
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
end

group :development do
  gem 'better_errors'
  gem 'pry-byebug'
  gem 'pry-nav'
  gem 'pry-rails'
  gem 'rails-erd'
  gem 'web-console'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end
