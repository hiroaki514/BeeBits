# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show] # 認証をスキップ

  def show
    if current_user
      render json: {
        logged_in: true,
        user: {
          id: current_user.id,
          email: current_user.email,
          name: current_user.name # 必要ならば追加
        }
      }
    else
      render json: { logged_in: false }
    end
  end
  
end
