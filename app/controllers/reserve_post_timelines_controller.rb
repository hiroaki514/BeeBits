# frozen_string_literal: true

class ReservePostTimelinesController < ApplicationController
  def create
    @reserve_post = ReservePostTimeline.new(content: params[:content])
    if @reserve_post.save
      flash[:success] = "投稿予約が完了しました。"
    else
      flash[:error] = "投稿予約に失敗しました。"
    end
    redirect_to root_path
  end
end
