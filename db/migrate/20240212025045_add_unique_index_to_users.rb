# frozen_string_literal: true

class AddUniqueIndexToUsers < ActiveRecord::Migration[6.0]
  def change
    add_index :users, :beebits_name, unique: true
  end
end
