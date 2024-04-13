# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { '蜜蜂太郎' }
    email { 'beebits@example.com' }
    phone_number { '08012345678' }
    birthdate { Date.new(1995, 0o1, 0o1) }
    beebits_name { '@bee_bits123' }
    password { 'password123' }
    password_confirmation { 'password123' }

    trait :dummy_user do
      name { '蜜蜂次郎' }
      email { 'beebits2@example.com' }
      phone_number { '09012345678' }
      birthdate { Date.new(1996, 0o1, 0o1) }
      beebits_name { '@bee_bits456' }
      password { 'password456' }
      password_confirmation { 'password456' }
    end
  end
end
