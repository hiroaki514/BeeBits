# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :system do
  it '未ログインの場合ログインページへ遷移すること' do
    visit root_path
    expect(page).to have_current_path(new_user_session_path)
  end

  context 'ログイン' do
    let!(:user) do
      User.create(
        name: '蜜蜂太郎',
        email: 'beebits@example.com',
        phone_number: '08012345678',
        birthdate: '1995-01-01',
        beebits_name: '@Bee_Bits',
        password: 'password123',
        password_confirmation: 'password123'
      )
    end

    it '正しい情報でログインができること' do
      visit new_user_session_path
      fill_in 'user_beebits_name', with: '@Bee_Bits'
      fill_in 'user_password', with: 'password123'
      click_button 'ログイン'
      expect(page).to have_current_path(root_path)
    end
  end

  describe 'ログアウト' do
    let!(:user) do
      User.create(
        name: '蜜蜂太郎',
        email: 'beebits@example.com',
        phone_number: '08012345678',
        birthdate: '1995-01-01',
        beebits_name: '@Bee_Bits',
        password: 'password123',
        password_confirmation: 'password123'
      )
    end

    it 'ログアウトができること' do
      visit new_user_session_path
      fill_in 'user_beebits_name', with: '@Bee_Bits'
      fill_in 'user_password', with: 'password123'
      click_button 'ログイン'
      expect(page).to have_current_path(root_path)
      click_button 'ログアウト'
      expect(page).to have_current_path(new_user_session_path)
    end
  end
end
