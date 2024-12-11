# frozen_string_literal: true

class BirthdateValidator < ActiveModel::Validator
  def validate(record)
    if record.birthdate.blank?
      record.errors.add(:birthdate, 'を入力してください')
    elsif record.birthdate > Date.current || record.birthdate < 150.years.ago.to_date
      record.errors.add(:birthdate, 'の入力が正しくありません')
    elsif record.birthdate > 15.years.ago.to_date
      record.errors.add(:birthdate, 'が15歳未満の方はご利用いただけません')
    end
  end
end
