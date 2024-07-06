# frozen_string_literal: true

class ReservePostTimeline < ApplicationRecord
  belongs_to :user
  has_many :favorites

  validates :content,
            presence: true,
            length: {
              minimum: 1,
              maximum: 140,
              message: 'は140文字以内で入力してください'
            }
end
