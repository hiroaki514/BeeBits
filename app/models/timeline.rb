# frozen_string_literal: true

class Timeline < ApplicationRecord
  belongs_to :user

  validates :content,
            presence: true,
            length: {
              minimum: 1,
              maximum: 140,
              message: 'は140文字以内で入力してください'
            }
end
