# frozen_string_literal: true

class Timeline < ApplicationRecord
  belongs_to :user
  has_many :favorites, dependent: :destroy

  validates :content,
            presence: true,
            length: {
              minimum: 1,
              maximum: 140,
              message: 'は140文字以内で入力してください'
            }

  # いいね数をカウントするメソッド
  delegate :count, to: :favorites, prefix: true
end
