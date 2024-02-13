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

      it '入力が有効な形式であること' do
        user = build(:user, email: 'beebits')
        user.valid?
        expect(user.errors.full_messages).to include('メールアドレス は有効な形式で入力してください')
      end

      it '大文字小文字を区別せずに、同じメールアドレスが存在しないこと' do
        create(:user, email: 'BeeBits@example.com')

        user2 = build(:user, email: 'beebits@example.com')
        user2.valid?
        expect(user2.errors.full_messages).to include('メールアドレス はすでに存在しています')
      end

      it '入力が254文字以内であること' do
        user = build(:user,
                     email: 'a' * 254 + '@example.com')
        user.valid?
        expect(user.errors.full_messages).to include('メールアドレス は254文字以内で入力してください')
      end
    end

    context '電話番号' do
      it '入力が必須であること' do
      end

      it '日本国内の電話番号であること' do
        user = build(:user, phone_number: '01012345678')
        user.valid?
        expect(user.errors.full_messages).to include('電話番号 は日本の携帯電話番号の形式で入力してください')
      end

      it '国際電話番号は無効であること' do
        user = build(:user, phone_number: '+1234567890')
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
        user = build(:user, birthdate: '2024-01-01')
        user.valid?
        expect(user.errors.full_messages).to include('生年月日 が15歳未満の方はご利用いただけません')
      end

      it '未来の日付は無効であること' do
        user = build(:user, birthdate: Time.zone.today + 1.day)
        user.valid?
        expect(user.errors.full_messages).to include('生年月日 の入力が正しくありません')
      end
    end

    context 'BeeBitsユーザー名' do
      it '入力が必須であること' do
        user = build(:user, beebits_name: '')
        user.valid?
        expect(user.errors.full_messages).to include('BeeBitsユーザー名 を入力してください')
      end

      it '大文字小文字を区別せずに、同じBeeBitsユーザー名が存在しないこと' do
        create(:user, beebits_name: '@Bee_Bits')

        user2 = build(:user, beebits_name: '@bee_bits')
        user2.valid?
        expect(user2.errors.full_messages).to include('BeeBitsユーザー名 はすでに存在しています')
      end

      it '入力が@を含めて15文字以内であること' do
        user = build(:user, beebits_name: '@beebits_test123')
        user.valid?
        expect(user.errors.full_messages).to include('BeeBitsユーザー名 は@を含め15文字以内で入力してください')
      end

      it '@(アットマーク)と_(アンダーバー)意外の記号が含まれないこと' do
        user = build(:user, beebits_name: '@bee!bits')
        user.valid?
        expect(user.errors.full_messages).to include(
          'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
        )
      end

      it '@(アットマーク)が2つ以上含まれないこと' do
        user = build(:user, beebits_name: 'bee@@bits')
        user.valid?
        expect(user.errors.full_messages).to include('BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます')
      end
    end

    context 'パスワード' do
      it '入力が必須であること' do
        user = build(:user, password: '')
        user.valid?
        expect(user.errors.full_messages).to include('パスワード を入力してください')
      end

      it '入力が8文字以上であること' do
        user = build(:user, password: 'bee83')
        user.valid?
        expect(user.errors.full_messages).to include('パスワード は8文字以上で入力してください')
      end

      it '入力が8文字以上かつ英数字が含まれること' do
        user = build(:user, password: 'BeeBitsPassword')
        user.valid?
        expect(user.errors.full_messages).to include('パスワード は英数字の組み合わせで8文字以上で入力してください')
      end

      it '入力が128文字以内であること' do
        user = build(:user, password: 'a' * 129 )
        user.valid?
        expect(user.errors.full_messages).to include('パスワード は128文字以内で入力してください')
      end

      it '入力が確認用と一致すること' do
        build(:user, password: 'password123')
        user = build(:user, password_confirmation: 'password1234')
        user.valid?
        expect(user.errors.full_messages).to include('パスワード(確認用) が一致しません')
      end

      it 'ユーザーのパスワードがハッシュ化されていること' do
        user = create(:user, password: 'password123')
        expect(user.encrypted_password).not_to eq('password123')
      end
    end
  end
end
