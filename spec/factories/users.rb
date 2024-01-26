# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'テスト太郎' }
    phone_number { '08012345678' }
    email { 'test@example.com' }
    birth_date { Date.new(1990, 1, 1) }
    password { 'password123' }
    beebits_name { '@testtarou' }
  end
end
