# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Timelines', type: :system do
  let(:user) { create(:user) }

  before do
    visit new_user_session_path
    fill_in 'user_beebits_name', with: '@bee_bits123'
    fill_in 'user_password', with: 'password123'
    click_on 'ログイン'
  end

  context 'テキスト投稿の場合' do
    context '0文字の場合' do
      it '失敗すること' do
        fill_in '投稿内容:', with: ''
        click_on '投稿'
        expect(page).to have_content '投稿の作成に失敗しました'
      end
    end
  end
end
