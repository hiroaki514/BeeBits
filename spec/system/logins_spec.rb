# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :system do
  describe 'ログイン' do
    context '未ログイン状態の場合' do
      it 'ログインページへ遷移すること' do
        visit root_path
        expect(page).to have_current_path(new_user_session_path)
      end
    end

    context 'ログイン状態の場合' do
      before do
        create(:user,
               name: '蜜蜂太郎',
               email: 'beebits@example.com',
               phone_number: '08012345678',
               birthdate: '1995-01-01',
               beebits_name: '@bee_bits123',
               password: 'password123',
               password_confirmation: 'password123')
      end

      it 'タイムラインへ遷移すること' do
        visit root_path
        fill_in 'BeeBitsユーザー名', with: '@bee_bits123'
        fill_in 'パスワード', with: 'password123'
        click_on 'ログイン'
        visit root_path
        expect(page).to have_current_path(root_path)
      end
    end
  end

  describe 'ログアウト' do
    before do
      create(:user,
             name: '蜜蜂太郎',
             email: 'beebits@example.com',
             phone_number: '08012345678',
             birthdate: '1995-01-01',
             beebits_name: '@bee_bits123',
             password: 'password123',
             password_confirmation: 'password123')
    end

    it 'ログアウトができること' do
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: '@bee_bits123'
      fill_in 'パスワード', with: 'password123'
      click_on 'ログイン'
      expect(page).to have_current_path(root_path)
      click_on 'ログアウト'
      expect(page).to have_current_path(new_user_session_path)
    end
  end
end
