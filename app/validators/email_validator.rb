# frozen_string_literal: true

class EmailValidator < ActiveModel::Validator
  def validate(record)
    if record.email.blank?
      record.errors.add(:email, "を入力してください")
    elsif record.email !~ /\A[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\z/
      record.errors.add(:email, "は有効な形式で入力してください")
    elsif record.email.length > 254
      record.errors.add(:email, "は254文字以内で入力してください")
    elsif User.where(email: record.email).exists?
      record.errors.add(:email, "はすでに存在しています")
    end
  end
end
