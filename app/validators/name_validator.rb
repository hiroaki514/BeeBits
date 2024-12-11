# frozen_string_literal: true

class NameValidator < ActiveModel::Validator
  def validate(record)
    if record.name.blank?
      record.errors.add(:name, 'を入力してください')
    elsif record.name.length < 2 || record.name.length > 50
      record.errors.add(:name, 'は2文字以上50文字以内で入力してください')
    end
  end
end
