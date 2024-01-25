# frozen_string_literal: true

class AddColumnsToUsers < ActiveRecord::Migration[7.1]
  def change
    change_table :users, bulk: true do |t|
      t.string :name, null: false, default: "", comments: "氏名"
      t.string :phone_number, comments: "電話番号"
      t.date :birthdate, null: false, comments: "生年月日"
      t.string :beebits_name, null: false, default: "", comments: "ログインID"
    end
  end
end
