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
  end

  describe '投稿の削除' do
    let(:user) { create(:user) }
    let(:dummy_user) { create(:user, :dummy_user) }

    before do
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: user.beebits_name
      fill_in 'パスワード', with: user.password
      click_on 'ログイン'

      # create(:timeline, user_id: user.id)
      # create(:timeline, user: user)
      create(:timeline, user:, content: '自身の投稿')
      create(:timeline, user: dummy_user, content: '他者の投稿')
      visit root_path
    end

    context '投稿者本人の場合' do
      it '削除ボタンが表示されること' do
        expect(page).to have_content '削除'
      end

      it '自身の投稿を削除でき、他者の投稿に削除ボタンが表示されていないこと' do
        click_on '削除'
        expect(page).to_not have_content '自身の投稿'
        expect(page).to have_content '他者の投稿'
        visit root_path
        expect(page).to_not have_content '削除' #他社の投稿に削除ボタンが表示されないこと
      end
    end
  end
end
