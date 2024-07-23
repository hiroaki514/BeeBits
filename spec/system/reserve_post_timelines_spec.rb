# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'ReservePostTimelines', type: :system do
  describe '予約投稿' do
    before do
      create(:user)
      visit new_user_session_path
      fill_in 'BeeBitsユーザー名', with: '@bee_bits123'
      fill_in 'パスワード', with: 'password123'
      click_on 'ログイン'
    end

    it '予約投稿テーブルに値が保存されること' do
      fill_in 'reserve_post_content', with: '予約投稿'
      click_on '予約投稿'
      expect(page).to have_content '投稿予約が完了しました。'
      reserve_post_timeline = ReservePostTimeline.last
      expect(reserve_post_timeline.content).to eq('予約投稿')
    end
  end
end
