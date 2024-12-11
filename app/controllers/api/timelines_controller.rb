# frozen_string_literal: true

module Api
  class TimelinesController < Api::ApplicationController
    def index
      @timelines = Timeline.order(created_at: :desc) || []
    end

    def new
      @timeline = Timeline.new
    end

    def create
      @timeline = Timeline.new(timeline_params)
      @timeline.user = current_user
      if @timeline.save
        redirect_to timelines_path, notice: '投稿が送信されました'
      else
        redirect_to timelines_path, alert: '投稿に失敗しました'
      end
    end

    def destroy
      timeline = Timeline.find(params[:id])
      if timeline.user == current_user
        timeline.destroy
        redirect_to timelines_path, notice: '投稿が削除されました'
      else
        redirect_to timelines_path, alert: '投稿の削除に失敗しました'
      end
    end

    private

    def timeline_params
      params.permit(:body, :user_id, :content)
    end
  end
end
