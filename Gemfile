# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.2'

gem 'bootsnap', require: false
gem 'bootstrap', '~> 5.3.1'
gem 'capybara', group: :test # テスト環境でのみ使うGem
gem 'devise'
gem 'devise-i18n'
gem 'importmap-rails'
gem 'jbuilder'
gem 'mysql2', '~> 0.5'
gem 'puma', '~> 6.4'
gem 'rails', '~> 7.1.2'
gem 'sassc-rails' # Sassのプロセスに必要なGem
gem 'seed-fu'
gem 'selenium-webdriver', group: :test # テスト環境でのみ使うGem
gem 'sprockets-rails'
gem 'sqlite3', '~> 1.4' # SQLite3はRailsに含まれているため追加する必要はありません
gem 'stimulus-rails'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
gem 'web-console', group: :development # 開発環境でのみ使うGem
gem 'webdrivers', group: :test # テスト環境でのみ使うGem

group :development, :test do
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'rspec-rails', '~> 6.0.0'
  gem 'rubocop', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
end
