class CreateReservePostTimelines < ActiveRecord::Migration[7.1]
  def change
    create_table :reserve_post_timelines do |t|
      t.text :content, null: false, comment: "予約投稿内容"
      t.timestamps
    end
  end
end
