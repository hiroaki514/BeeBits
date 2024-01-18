class AddColumnsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string
    add_column :users, :phone_number, :string
    add_column :users, :birthdate, :date
    add_column :users, :password, :string
    add_column :users, :BeeBits_id, :string
  end
end
