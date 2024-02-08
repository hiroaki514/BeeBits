# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validation' do
    context '名前' do
      it '入力が必須であること' do

      end

      it '2文字以上の入力であること' do

      end

      it '入力が50文字以内であること' do
        
      end
    end

    context 'メールアドレス' do
      it '入力が必須であること' do
        
      end

      it '有効な形式であること' do
        
      end

      it '入力が254文字以内であること' do
        
      end
    end

    context '電話番号' do
      it '入力が必須であること' do
        pending
      end

      it '有効な形式であること' do
        pending
      end

      it '日本国内の形式であること' do
        pending
      end
    end

    context '生年月日' do
      it '入力が必須であること' do

      end

      it '有効な形式であること' do
        
      end

      it '入力が15歳以上であること' do
        
      end
    end

    context 'BeeBitsユーザー名' do
      it '入力が必須であること' do
        
      end

      it '大文字小文字を区別せずに、同じBeeBitsユーザー名が存在しないこと' do
        
      end

      it '入力が@を含めて15文字以内であること' do
        
      end

      it '@(アットマーク)と_(アンダーバー)意外の記号が含まれないこと' do
        
      end

      it '@(アットマーク)が2つ以上含まれないこと' do
        
      end
    end

    context 'パスワード' do
      it '入力が必須であること' do
        
      end

      it '入力が8文字以上であること' do
        
      end

      it '入力が8文字以上かつ英数字が含まれること' do
        
      end

      it '入力が128文字以内であること' do
        
      end
    end
  end
end
