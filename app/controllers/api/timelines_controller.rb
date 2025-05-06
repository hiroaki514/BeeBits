# frozen_string_literal: true

module Api
  class TimelinesController < Api::BaseController
    # タイムラインの一覧表示
    def index
      timelines = Timeline.includes(:user, :favorites).order(created_at: :desc)
      render json: serialize_timelines(timelines)
    end

    # タイムラインの詳細＋リプライツリー表示
    def show
      timeline = Timeline.includes(:user, :favorites, replies: { user: [], favorites: [] }).find(params[:id])
      render json: serialize_with_replies(timeline)
    end

    # タイムラインの作成（投稿またはリプライ）
    def create
      timeline = Timeline.new(timeline_params)
      timeline.user = current_user
      if timeline.save
        timeline_with_relations = Timeline.includes(:user, :favorites).find(timeline.id)
        render json: serialize_timeline(timeline_with_relations), status: :created
      else
        render json: { error: '投稿に失敗しました' }, status: :unprocessable_entity
      end
    end

    # タイムラインの削除（物理削除のみ）
    def destroy
      timeline = Timeline.find(params[:id])
      if timeline.user != current_user
        render json: { error: '削除に失敗しました' }, status: :forbidden
        return
      end

      timeline.destroy

      render json: { message: '投稿が削除されました' }, status: :ok
    end

    private

    def timeline_params
      params.permit(:content, :parent_id)
    end

    def serialize_timelines(timelines)
      timelines.as_json(
        include: {
          user: { only: %i[id name beebits_name] },
          favorites: { only: %i[id user_id] }
        },
        methods: [:favorites_count, :total_replies_count]
      )
    end

    def serialize_timeline(timeline)
      timeline.as_json(
        include: {
          user: { only: %i[id name beebits_name] },
          favorites: { only: %i[id user_id] }
        },
        methods: [:favorites_count]
      )
    end

    def serialize_with_replies(timeline)
      serialized = serialize_timeline(timeline)
      serialized['replies'] = timeline.replies.order(created_at: :asc).map do |reply|
        serialize_with_replies(reply)
      end
      serialized
    end
  end
end
