# frozen_string_literal: true

require 'selenium-webdriver'
require 'capybara/rspec'

Capybara.register_driver :chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    'goog:chromeOptions': {
      args: ['headless', 'window-size=1200,970', 'no-sandbox', 'disable-gpu', 'disable-dev-shm-usage']
    }
  )

  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    url: 'http://selenium-hub:4444/wd/hub',
    capabilities:
  )
end
