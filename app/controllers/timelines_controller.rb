# frozen_string_literal: true

class TimelinesController < ApplicationController
  def index
    @timelines = Timeline.all || []
  end

  def new
    @timeline = Timeline.new
  end

  def create
    @timeline = Timeline.new(timeline_params)
    @timeline.user = current_user
    if @timeline.save
      redirect_to timelines_path, notice: '投稿が作成されました'
    else
      redirect_to timelines_path, alert: '投稿の作成に失敗しました'
    end
  end

  private

  def timeline_params
    params.permit(:body, :user_id, :content)
  end
end
