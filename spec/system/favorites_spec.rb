# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Timelines', type: :system do
  describe 'いいね機能' do
    let(:user) { create(:user) }
    let(:dummy_user) { create(:user, :dummy_user) }

    before do
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: user.beebits_name
      fill_in 'パスワード', with: user.password
      click_on 'ログイン'

      create(:timeline, user: dummy_user, content: 'いいねテスト投稿')
      visit root_path
    end

    context 'いいねを押した場合' do
      before do
        click_on 'いいね'
      end

      it 'いいねを外すに変わること' do
        expect(page).to have_content 'いいねを外す'
      end
      it 'いいねカウントが１増えること' do
        expect(page).to have_content '1'
      end
      it 'favoritesテーブルのレコード数が1になること' do
        expect(Favorite.count).to eq(1)
      end
    end
    context 'いいねを外した場合' do
      before do
        click_on 'いいね'
        click_on 'いいねを外す'
      end

      it 'いいねに変わること' do
        expect(page).to have_content 'いいね'
      end
      it 'いいねカウントが0になること' do
        expect(page).to have_content '0'
      end
      it 'favoritesテーブルのレコード数が0になること' do
        expect(Favorite.count).to eq(0)
      end
    end
  end
end
