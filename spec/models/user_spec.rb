# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validation' do
    context '名前' do
      it '入力が必須であること' do
        user = build(:user, name: '')
        user.valid?
        expect(user.errors.full_messages).to include('名前 を入力してください')
      end

      it '2文字以上の入力であること' do
        user = build(:user, name: '蜂')
        user.valid?
        expect(user.errors.full_messages).to include('名前 は2文字以上で入力してください')
      end

      it '入力が50文字以内であること' do
        user = build(:user, name: 'a' * 51)
        user.valid?
        expect(user.errors.full_messages).to include('名前 は50文字以内で入力してください')
      end
    end

    context 'メールアドレス' do
      it '入力が必須であること' do
        user = build(:user, email: '')
        user.valid?
        expect(user.errors.full_messages).to include('メールアドレス を入力してください')
      end

      it '有効な形式であること' do
        user = build(:user, email: 'beebits@com')
        user.valid?
        expect(user.errors.full_messages).to include('メールアドレス は有効な形式で入力してください')
      end

      it '入力が254文字以内であること' do
        user = build(:user, email: 'b' * 241 + '@example.com')
        user.valid?
        expect(user.errors.full_messages).to include('メールアドレス は254文字以内で入力してください')
      end
    end

    context '電話番号' do
      it '入力が必須であること' do

      end

      it '日本国内の形式であること' do
        user = build(:user, phone_number: '01012345678')
        user.valid?
        expect(user.errors.full_messages).to include('電話番号 は日本の携帯電話番号の形式で入力してください')
      end
    end

    context '生年月日' do
      it '入力が必須であること' do
        user = build(:user, birthdate: '')
        user.valid?
        expect(user.errors.full_messages).to include('生年月日 を入力してください')
      end

      it '有効な形式であること' do
        user = build(:user, birthdate: '1800-01-01')
        user.valid?
        expect(user.errors.full_messages).to include('生年月日 の入力が正しくありません')
      end

      it '入力が15歳以上であること' do
        user = build(:user, birthdate: three_days_ago - 15.years - 1.day)
        user.valid?
        expect(user.errors.full_messages).to include('生年月日 が15歳未満の方はご利用いただけません')
      end
    end

    context 'BeeBitsユーザー名' do
      it '入力が必須であること' do
        user = build(:user, beebits_name: '')
        user.valid?
        expect(user.errors.full_messages).to include('BeeBitsユーザー名 を入力してください')
      end

      it '大文字小文字を区別せずに、同じBeeBitsユーザー名が存在しないこと' do

      end

      it '入力が@を含めて15文字以内であること' do
        user = build(:user, beebits_name: '@beebits_test123')
        user.valid?
        expect(user.errors.full_messages).to include('BeeBitsユーザー名 は文字以内で入力してください')
      end

      it '@(アットマーク)と_(アンダーバー)意外の記号が含まれないこと' do
        
      end

      it '@(アットマーク)が2つ以上含まれないこと' do
        
      end
    end

    context 'パスワード' do
      it '入力が必須であること' do
        user = build(:user, password: '')
        user.valid?
        expect(user.errors.full_messages).to include('パスワード を入力してください')
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
