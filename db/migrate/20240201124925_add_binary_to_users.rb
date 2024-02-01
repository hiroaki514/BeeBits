# frozen_string_literal: true

class AddBinaryToUsers < ActiveRecord::Migration[7.1]
  def up
    execute 'ALTER TABLE users MODIFY beebits_name BINARY;'
  end

  def down
    execute 'ALTER TABLE users MODIFY beebits_name STRING;'
  end
end
