# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BeeBits
  class Application < Rails::Application
    config.i18n.default_locale = :ja
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Add the following lines to set Rspec as the default test framework
    config.generators do |g|
      g.test_framework :rspec
      g.skip_routes false
      g.assets false
      g.helper false
    end

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local

    # CORS設定
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:5173' # Reactのオリジン
        resource '*',
                 headers: :any,
                 methods: %i[get post put patch delete options head],
                 credentials: true
      end
    end
  end
end
