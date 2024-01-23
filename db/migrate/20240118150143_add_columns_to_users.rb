# frozen_string_literal: true

class AddColumnsToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users, bulk: true do |t|
      t.string :name
      t.string :phone_number
      t.date :birthdate
      t.string :BeeBits_id
    end

    add_index :users, :BeeBits_id, unique: true
  end
end
