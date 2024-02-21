# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  validates :post_content,
            presence: true,
            length: { maximum: 140,
            message: "は140文字以内で入力してください"
            }
end
