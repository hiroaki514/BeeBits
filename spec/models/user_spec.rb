# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validation' do
    context '入力項目のバリデーション' do
      it '名前の入力が必須であること' do
        user = build(:user, name: '')
        user.valid?
        expect(user.errors.full_messages).to include('名前 を入力してください')
      end
    end
  end
end
