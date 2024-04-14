# frozen_string_literal: true

class FavoritesController < ApplicationController
  def create
    Favorite.create(user_id: current_user.id, timeline_id: params[:id])
    redirect_to root_path
  end
end
