# frozen_string_literal: true

module Api
  class TimelinesController < Api::BaseController
    # タイムラインの一覧表示
    def index
      timelines = Timeline.includes(:user, :favorites).order(created_at: :desc)
      render json: timelines.as_json(
        include: {
          user: { only: [:id, :name, :beebits_name] },
          favorites: { only: [:id, :user_id] }
        },
        methods: [:favorites_count]
      )
    end

    # タイムラインの作成
    def create
      timeline = Timeline.new(timeline_params)
      timeline.user = current_user
      if timeline.save
        render json: { message: '投稿が送信されました' }, status: :created
      else
        render json: { error: '投稿に失敗しました' }, status: :unprocessable_entity
      end
    end

    # タイムラインの削除
    def destroy
      timeline = Timeline.find(params[:id])
      if timeline.user == current_user
        timeline.destroy
        render json: { message: '投稿が削除されました' }, status: :ok
      else
        render json: { error: '削除に失敗しました' }, status: :forbidden
      end
    end

    private

    def timeline_params
      params.permit(:content)
    end
  end
end
