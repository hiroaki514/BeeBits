# frozen_string_literal: true

module Api
  class SessionsController < BaseController
    # 認証をスキップ
    skip_before_action :authenticate_user!, only: [:show]

    def show
      Rails.logger.info("Current User: #{current_user.inspect}")
      if current_user
        render json: {
          logged_in: true,
          user: {
            id: current_user.id,
            email: current_user.email,
            name: current_user.name
          }
        }, status: :ok
      else
        render json: { logged_in: false }, status: :unauthorized
      end
    end
    
  end
end
