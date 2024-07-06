# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ReservePostTimeline, type: :model do
  describe '#validation' do
    context 'テキスト投稿の場合' do
      let(:user) { build(:user) }
      let(:reserve_post_timeline) { build(:reserve_post_timeline, user:, content:) }

      context '入力が0文字の場合' do
        let(:content) { '' }

        it '無効であること' do
          expect(reserve_post_timeline).not_to be_valid
        end
      end

      context '入力が1文字の場合' do
        let(:content) { '蜂' }

        it '有効であること' do
          expect(reserve_post_timeline).to be_valid
        end
      end

      context '入力が2文字の場合' do
        let(:content) { '蜜蜂' }

        it '有効であること' do
          expect(reserve_post_timeline).to be_valid
        end
      end

      context '入力が139文字の場合' do
        let(:content) { '蜂' * 139 }

        it '有効であること' do
          expect(reserve_post_timeline).to be_valid
        end
      end

      context '入力が140文字の場合' do
        let(:content) { '蜂' * 140 }

        it '有効であること' do
          expect(reserve_post_timeline).to be_valid
        end
      end

      context '入力が141文字の場合' do
        let(:content) { '蜂' * 141 }

        it '無効であること' do
          expect(reserve_post_timeline).not_to be_valid
        end
      end
    end
  end
end
