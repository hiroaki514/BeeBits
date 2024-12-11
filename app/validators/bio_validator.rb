# frozen_string_literal: true

class BioValidator < ActiveModel::Validator
  def validate(record)
    return unless record.bio.present? && record.bio.length > 160

    record.errors.add(:bio, 'は160文字以内で入力してください')
  end
end
