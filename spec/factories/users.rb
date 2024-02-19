# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { '蜜蜂太郎' }
    email { 'beebits@example.com' }
    phone_number { '08012345678' }
    birthdate { Date.new(1995, 01, 01) }
    beebits_name { '@bee_bits123' }
    password { 'password123' }
    password_confirmation { 'password123' }
  end
end
