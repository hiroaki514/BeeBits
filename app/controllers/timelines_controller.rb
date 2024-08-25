# frozen_string_literal: true

class TimelinesController < ApplicationController
  before_action :authenticate_user!

  def index
    timelines = Timeline.order(created_at: :desc)
    render json: timelines.as_json(only: [:id, :content, :created_at], include: { user: { only: [:id, :name, :beebits_name] } })
  end

  def create
    timeline = Timeline.new(timeline_params)
    timeline.user = current_user
    if timeline.save
      render json: { notice: '投稿が送信されました', timeline: timeline }, status: :created
    else
      render json: { alert: '投稿に失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    timeline = Timeline.find(params[:id])
    if timeline.user == current_user
      timeline.destroy
      render json: { notice: '投稿が削除されました' }, status: :ok
    else
      render json: { alert: '投稿の削除に失敗しました' }, status: :forbidden
    end
  end

  private

  def timeline_params
    params.require(:timeline).permit(:content)
  end
end
