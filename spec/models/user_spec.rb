# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validation' do
    context '名前の場合' do
      let(:user) { build(:user, name:) }
      # let(:user) {build(:user, name: name) }

      context '空の場合' do
        let(:name) { nil }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('名前 を入力してください')
        end
      end

      context '1文字の場合' do
        let(:name) { '蜂' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('名前 は2文字以上で入力してください')
        end
      end

      context '2文字の場合' do
        let(:name) { '蜜蜂' }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '3文字の場合' do
        let(:name) { '蜜蜂太' }
        it 'エラーが表示されること' do
          expect(user).to be_valid
        end
      end

      context '49文字の場合' do
        let(:name) { 'a' * 49 }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '50文字の場合' do
        let(:name) { 'a' * 50 }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '51文字の場合' do
        let(:name) { 'a' * 51 }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('名前 は50文字以内で入力してください')
        end
      end
    end

    context 'メールアドレスの場合' do
      let(:user) { build(:user, email:) }

      context '空の場合' do
        let(:email) { nil }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('メールアドレス を入力してください')
        end
      end

      context '無効な形式の場合' do
        let(:email) { 'beebits' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('メールアドレス は有効な形式で入力してください')
        end
      end

      context '大文字小文字を区別せずに、重複する場合' do
        let(:email) { 'BeeBits@example.com' }

        it 'エラーが表示されること' do
          user2 = build(:user,
          name { 'テスト太郎2' },
          phone_number { '08012345678' },
          email { 'beebits@example.com' },
          birthdate { Date.new(1990, 1, 1) },
          password { 'password123' },
          beebits_name { '@beebits' }
          )
          user2.valid?
          expect(user2.errors.full_messages).to include('メールアドレス はすでに存在しています')
        end
      end

      context '253文字の場合' do
        let(:email) { "a" * 241 + "@example.com" }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '254文字の場合' do
        let(:email) { "a" * 242 + "@example.com" }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '255文字の場合' do
        let(:email) { "a" * 243 + "@example.com" }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('メールアドレス は254文字以内で入力してください')
        end
      end
    end

    context '電話番号の場合' do
      let(:user) { build(:user, phone_number:) }

      # context '空の場合' do
      #   let(:phone_number) { nil }

      #   it 'エラーが表示されること' do
      #     user.valid?
      #     expect(user.errors.full_messages).to include('')
      #   end
      # end

      context '形式が日本国内の電話番号以外の場合' do
        let(:phone_number) { '01012345678' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('電話番号 は日本の携帯電話番号の形式で入力してください')
        end
      end

      context '国際番号の場合' do
        let(:phone_number) { '+1234567890' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('電話番号 は日本の携帯電話番号の形式で入力してください')
        end
      end
    end

    context '生年月日の場合' do
      let(:user) { build(:user, birthdate:) }

      context '空の場合' do
        let(:birthdate) { '' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('生年月日 を入力してください')
        end
      end

      context '無効な形式の場合' do
        let(:birthdate) { '1800-01-01' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('生年月日 の入力が正しくありません')
        end
      end

      context '14歳の場合' do
        let(:birthdate) { 14.years.ago.strftime('%Y-%m-%d') }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('生年月日 が15歳未満の方はご利用いただけません')
        end
      end

      context '15歳の場合' do
        let(:birthdate) { 15.years.ago.strftime('%Y-%m-%d') }

        it 'エラーが表示されること' do
          expect(user).to be_valid
        end
      end

      context '16歳の場合' do
        let(:birthdate) { 16.years.ago.strftime('%Y-%m-%d') }

        it 'エラーが表示されること' do
          expect(user).to be_valid
        end
      end

      context '日付が未来の場合' do
        let(:birthdate) { 1.day.from_now.strftime('%Y-%m-%d') }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('生年月日 の入力が正しくありません')
        end
      end
    end

    context 'BeeBitsユーザー名の場合' do
      let(:user) { build(:user, beebits_name:) }

      context '空の場合' do
        let(:beebits_name) { '' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('BeeBitsユーザー名 を入力してください')
        end
      end

      context '大文字小文字を区別せずに、重複する場合' do
        let(:beebits_name) { '@Bee_Bits' }

        it 'エラーが表示されること' do
          user2 = build(:user, beebits_name: '@bee_bits')
          user2.valid?
          expect(user2.errors.full_messages).to include('BeeBitsユーザー名 はすでに存在しています')
        end
      end

      context '14文字の場合' do
        let(:beebits_name) { '@beebits_test1' }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '15文字の場合' do
        let(:beebits_name) { '@beebits_test12' }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '16文字の場合' do
        let(:beebits_name) { '@beebits_test123' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('BeeBitsユーザー名 は@を含め15文字以内で入力してください')
        end
      end

      context '@(アットマーク)と_(アンダーバー)意外の記号が含まれる場合' do
        let(:beebits_name) { '@bee!bits' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include(
            'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
          )
        end
      end

      context '@(アットマーク)が2つ以上含まれる場合' do
        let(:beebits_name) { 'bee@@bits' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます')
        end
      end
    end

    context 'パスワードの場合' do
      let(:user) { build(:user, password:) }

      context '空の場合' do
        let(:password) { '' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('パスワード を入力してください')
        end
      end

      context '8文字未満の場合' do
        let(:password) { 'pass123' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('パスワード は8文字以上で入力してください')
        end
      end

      context '英数字が混合でない場合' do
        let(:password) { 'BeeBitsPassword' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('パスワード は英数字の組み合わせで8文字以上で入力してください')
        end
      end

      context '127文字の場合' do
        let(:password) { 'a' * 120 + '1234567' }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '128文字の場合' do
        let(:password) { 'a' * 120 + '12345678' }

        it 'エラーが表示されないこと' do
          expect(user).to be_valid
        end
      end

      context '129文字の場合' do
        let(:password) { 'a' * 120 + '123456789' }

        it 'エラーが表示さること' do
          user.valid?
          expect(user.errors.full_messages).to include('パスワード は128文字以内で入力してください')
        end
      end
    end

    context '確認用パスワードの場合' do
      let(:user) { build(:user, password_confirmation:) }

      context '一致しない場合' do
        let(:password_confirmation) { 'password1234' }

        it 'エラーが表示されること' do
          user.valid?
          expect(user.errors.full_messages).to include('パスワード(確認用) が一致しません')
        end
      end
    end

    context 'パスワードのハッシュ化が正常な場合' do
      let(:password) { 'password123' }

      it '入力値と一致しないこと' do
        expect(user.encrypted_password).not_to eq('password123')
      end
    end
  end
end
