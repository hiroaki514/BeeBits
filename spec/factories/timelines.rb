# frozen_string_literal: true

FactoryBot.define do
  factory :timeline do
    content { 'テスト投稿' }
    association :user
  end
end
