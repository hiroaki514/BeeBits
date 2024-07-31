# frozen_string_literal: true

class AddBioToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :bio, :text, after: :beebits_name, comment: '自己紹介'
  end
end
