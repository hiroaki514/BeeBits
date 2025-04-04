class AddParentIdToTimelines < ActiveRecord::Migration[8.0]
  def change
    add_column :timelines, :parent_id, :integer
  end
end
