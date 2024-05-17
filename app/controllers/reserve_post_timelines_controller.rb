# frozen_string_literal: true

class ReservePostTimelinesController < ApplicationController
  def create
    @reserve_post = ReservePostTimeline.new(reserve_post_params)
    if @reserve_post.save
      flash[:success] = "投稿予約が完了しました。"
    else
      flash[:error] = "投稿予約に失敗しました。"
    end
    redirect_to root_path
  end

  private

  def reserve_post_params
    params.require(:reserve_post_timeline).permit(:content)
  end

end
