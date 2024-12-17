# frozen_string_literal: true

module Api
  class BaseController < ActionController::API
    protect_from_forgery with: :null_session
  end
end
