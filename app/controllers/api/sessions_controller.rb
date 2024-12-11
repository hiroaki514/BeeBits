# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show] # 認証をスキップ

  def show
    if current_user
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end
end
