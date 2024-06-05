namespace :reserve_post do
  desc '予約投稿テーブルから投稿テーブルにデータを移行して、予約投稿テーブルから削除'
  task save_posts: :environment do
    # 予約投稿テーブルから投稿テーブルにデータを移行する記述
    ReservePostTimeline.all.each do |timeline|
      Timeline.create(content: timeline.content, user_id: timeline.user_id)
    end

    # 予約投稿テーブルからデータを削除する記述
    ReservePostTimeline.destroy_all
  end
end
