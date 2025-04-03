class AddForeignKeysToFavoritesAndReservePostTimelines < ActiveRecord::Migration[7.1]
  def change
    # favorites テーブルの外部キー再定義
    remove_column :favorites, :user_id, :integer
    remove_column :favorites, :timeline_id, :integer
    add_reference :favorites, :user, null: false, foreign_key: true
    add_reference :favorites, :timeline, null: false, foreign_key: true

    # reserve_post_timelines テーブルの外部キー修正
    remove_column :reserve_post_timelines, :user_id, :integer
    add_reference :reserve_post_timelines, :user, null: false, foreign_key: true
  end
end
