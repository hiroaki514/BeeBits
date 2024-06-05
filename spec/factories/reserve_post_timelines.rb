# frozen_string_literal: true

FactoryBot.define do
  factory :reserve_post_timeline do
    content { '予約投稿' }
    user_id { 1 }
  end
end
