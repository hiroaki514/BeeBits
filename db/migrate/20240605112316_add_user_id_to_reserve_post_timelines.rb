class AddUserIdToReservePostTimelines < ActiveRecord::Migration[7.1]
  def change
    add_column :reserve_post_timelines, :user_id, :integer, null: false, comment: "ユーザーID", after: :content
  end
end
