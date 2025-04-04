# frozen_string_literal: true

class Timeline < ApplicationRecord
  belongs_to :user
  belongs_to :parent, class_name: 'Timeline', optional: true

  has_many :replies, class_name: 'Timeline', foreign_key: 'parent_id', dependent: :nullify
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

  # 論理削除された投稿を除外するスコープ
  scope :active, -> { where(is_deleted: false) }

  # 論理削除されているかを判定
  def deleted?
    is_deleted
  end

  # 子リプライを再帰的にカウント
  def total_replies_count
    replies.to_a.sum { |reply| 1 + reply.total_replies_count }
  end
end
