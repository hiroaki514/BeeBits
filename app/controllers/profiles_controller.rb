# frozen_string_literal: true

class ProfilesController < ApplicationController
  def show
    @user = User.find(params[:id])
    @timelines = @user.timelines.order(created_at: :desc)
  end
end
