# frozen_string_literal: true

class CreateTimelines < ActiveRecord::Migration[7.1]
  def change
    create_table :timelines do |t|
      t.text :content
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
