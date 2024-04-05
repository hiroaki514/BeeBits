# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Timelines', type: :system do
  describe '投稿' do
    before do
      create(:user)
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: '@bee_bits123'
      fill_in 'パスワード', with: 'password123'
      click_on 'ログイン'
    end

    context 'テキスト投稿の場合' do
      context '0文字の場合' do
        it '失敗すること' do
          fill_in 'content', with: ''
          click_on '投稿'
          expect(page).to have_content '投稿に失敗しました'
        end
      end

      context '1文字の場合' do
        it '成功すること' do
          fill_in 'content', with: '蜂'
          click_on '投稿'
          expect(page).to have_content '投稿が送信されました'
        end
      end

      context '2文字の場合' do
        it '成功すること' do
          fill_in 'content', with: '蜜蜂'
          click_on '投稿'
          expect(page).to have_content '投稿が送信されました'
        end
      end

      context '139文字の場合' do
        it '成功すること' do
          fill_in 'content', with: '蜂' * 139
          click_on '投稿'
          expect(page).to have_content '投稿が送信されました'
        end
      end

      context '140文字の場合' do
        it '成功すること' do
          fill_in 'content', with: '蜂' * 140
          click_on '投稿'
          expect(page).to have_content '投稿が送信されました'
        end
      end

      context '141文字の場合' do
        it '失敗すること' do
          fill_in 'content', with: '蜂' * 141
          click_on '投稿'
          expect(page).to have_content '投稿に失敗しました'
        end
      end
    end

    context '投稿削除の場合' do
      context '投稿者本人の場合' do
        it '成功すること' do
        end
      end

      context '他者の投稿の場合' do
        it '削除できないこと' do
        end
      end
    end
  end
end
