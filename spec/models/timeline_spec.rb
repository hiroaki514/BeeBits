# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Timeline, type: :model do
  describe '投稿' do
    context 'テキスト投稿の場合' do
      let(:user) { build(:user) }
      let(:timeline) { build(:timeline, user:, content:) }

      context '入力が0文字の場合' do
        let(:content) { '' }

        it '無効であること' do
          expect(timeline).not_to be_valid
        end
      end

      context '入力が1文字の場合' do
        let(:content) { '蜂' }

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が2文字の場合' do
        let(:content) { '蜜蜂' }

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が139文字の場合' do
        let(:content) { '蜂' * 139 }

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が140文字の場合' do
        let(:content) { '蜂' * 140 }

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が141文字の場合' do
        let(:content) { '蜂' * 141 }

        it '無効であること' do
          expect(timeline).not_to be_valid
        end
      end
    end

    context '投稿を削除する場合' do
      let(:user) { build(:user) }
      let(:timeline) { build(:timeline, user:, content:) }

      context '投稿者本人の場合' do
        it '削除できること' do
          expect { timeline.destroy }.to change(Timeline, :count).by(-1)
        end
      end

      context '他者の投稿の場合' do
        it '削除できないこと' do
          timeline.user = user
          expect { timeline.destroy }.not_to change(Timeline, :count)
        end
      end

    end
  end
end
