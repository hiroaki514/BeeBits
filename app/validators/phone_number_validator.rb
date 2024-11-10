# frozen_string_literal: true

class PhoneNumberValidator < ActiveModel::Validator
  def validate(record)
    if record.phone_number.present? && !(record.phone_number =~ /\A(?:\+81|0(?:70|80|90))\d{8,9}\z/)
      record.errors.add(:phone_number, "は日本の携帯電話番号の形式で入力してください")
    end
  end
end
