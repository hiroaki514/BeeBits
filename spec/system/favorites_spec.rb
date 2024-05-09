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

      create(:timeline, user: dummy_user, content: '他者の投稿')
      visit root_path
    end

    context 'いいねを押した場合' do
      before do
        click_on 'いいね'
      end

      it 'いいねを外すに変わること' do

      end
      it 'いいねカウントが１増えること' do

      end
      it 'favoritesテーブルのレコード数が1になること' do
        expect(Favorite.count).to eq(1)
      end
    end
    context 'いいねを外した場合' do
      it 'いいねに変わること' do

      end
      it 'いいねカウントが１減ること' do

      end
      it 'favoritesテーブルのレコード数が0になること' do

      end
    end
  end
end
