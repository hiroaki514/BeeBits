# frozen_string_literal: true

class PasswordValidator < ActiveModel::Validator
  def validate(record)
    if record.password.blank?
      # パスワードが空のときにエラーメッセージを追加
      record.errors.add(:password, 'を入力してください')
    elsif record.password.length < 8 || record.password !~ /(?=.*[a-zA-Z])(?=.*\d)/
      # パスワードが無効なときにエラーメッセージを追加
      record.errors.add(:password, 'の形式が間違っています')
    end
  end
end
