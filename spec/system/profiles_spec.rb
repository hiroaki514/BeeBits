# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Profiles', type: :system do
  describe 'プロフィール画面' do
    let(:user) { create(:user, bio: 'これはサンプルの自己紹介テキストです。') }
    let(:other_user) { create(:user, :dummy_user, bio: 'これは別のサンプルの自己紹介テキストです。') }
    let!(:user_post) { create(:timeline, user:, content: '自分の投稿') }
    let!(:other_user_post) { create(:timeline, user: other_user, content: '他者の投稿') }

    before do
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: user.beebits_name
      fill_in 'パスワード', with: user.password
      click_on 'ログイン'
    end

    context '自身のプロフィール画面の場合' do
      it '自分の投稿のみが表示されること' do
        visit user_profile_path(user)
        expect(page).to have_content('自分の投稿')
        expect(page).not_to have_content('他者の投稿')
      end

      it '自己紹介テキストが表示されること' do
        visit user_profile_path(user)
        expect(page).to have_content('これはサンプルの自己紹介テキストです。')
      end

      it '自己紹介テキストを編集できること' do
        visit edit_user_profile_path(user)
        fill_in '自己紹介', with: '新しい自己紹介テキストです。'
        click_on '更新'
        expect(page).to have_content('新しい自己紹介テキストです。')
      end

      it '自己紹介テキストの文字数制限が適用されること' do
        visit edit_user_profile_path(user)
        fill_in '自己紹介', with: 'a' * 161
        click_on '更新'
        expect(page).to have_content('自己紹介 は160文字以内で入力してください')
      end
    end

    context '他者のプロフィール画面の場合' do
      it '他者の投稿のみが表示されること' do
        visit timelines_path
        click_on other_user.name
        expect(page).to have_content('他者の投稿')
        expect(page).not_to have_content('自分の投稿')
      end

      it '他者の自己紹介テキストが表示されること' do
        visit timelines_path
        click_on other_user.name
        expect(page).to have_content('これは別のサンプルの自己紹介テキストです。')
      end
    end
  end
end
