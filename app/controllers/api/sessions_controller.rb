# frozen_string_literal: true

module Api
  class SessionsController < ApplicationController
    # 認証をスキップ（showアクションのみ）
    skip_before_action :authenticate_user!, only: [:show]
    # リクエストフォーマットをJSONに限定
    before_action :ensure_json_request, only: [:show]

    def show
      # リクエストの形式をログに出力
      logger.info "Request format: #{request.format}"
      
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
    

    private

    # リクエストフォーマットがJSONであることを確認
    def ensure_json_request
      unless request.format.json?
        render json: { error: 'Unsupported format' }, status: :not_acceptable
      end
    end
  end
end
