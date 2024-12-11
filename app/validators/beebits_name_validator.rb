# frozen_string_literal: true

class BeebitsNameValidator < ActiveModel::Validator
  def validate(record)
    if record.beebits_name.blank?
      record.errors.add(:beebits_name, 'を入力してください')
    elsif !/\A@[\w]+\z/.match?(record.beebits_name)
      record.errors.add(:beebits_name, 'は英数字とアンダーバー(_)のみが使用できます')
    elsif record.beebits_name.length > 15
      record.errors.add(:beebits_name, 'は15文字以内で入力してください')
    elsif User.where('lower(beebits_name) = ?', record.beebits_name.downcase).where.not(id: record.id).exists?
      record.errors.add(:beebits_name, 'はすでに存在します')
    end
  end
end
