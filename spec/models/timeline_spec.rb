# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Timeline, type: :model do
  describe '#validation' do
    context 'テキストの場合' do
      let(:user) { create(:user) }
      let(:timeline) { create(:timeline, user: user) }

      context '入力が0文字の場合' do
        before do
          timeline.update(content: '')
        end

        it '無効であること' do
          expect(timeline).not_to be_valid
        end
      end

      context '入力が1文字の場合' do
        before do
          timeline.update(content: 'あ')
        end

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が2文字の場合' do
        before do
          timeline.update(content: 'あい')
        end

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が139文字の場合' do
        before do
          timeline.update(content: 'あ' * 139)
        end

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が140文字の場合' do
        before do
          timeline.update(content: 'あ' * 140)
        end

        it '有効であること' do
          expect(timeline).to be_valid
        end
      end

      context '入力が141文字の場合' do
        before do
          timeline.update(content: 'あ' * 141)
        end

        it '無効であること' do
          expect(timeline).not_to be_valid
        end
      end

    end
  end

end
