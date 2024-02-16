# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'テスト太郎' }
    email { 'test@example.com' }
    phone_number { '08012345678' }
    birthdate { Date.new(1990, 1, 1) }
    beebits_name { '@test_tarou' }
    password { 'password123' }
    password_confirmation { 'password123' }
  end
end
