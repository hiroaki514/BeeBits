# frozen_string_literal: true

class ReservePostTimelinesController < ApplicationController
  def create
    @reserve_post_timeline = ReservePostTimeline.new(reserve_post_params)
    if @reserve_post_timeline.save
      flash[:success] = '投稿予約が完了しました。'
    else
      flash[:error] = '投稿予約に失敗しました。'
    end
    redirect_to root_path
  end

  private

  def reserve_post_params
    params.permit(:content, :user_id)
  end
end
