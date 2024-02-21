# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :system do
  context 'ユーザーがログインページへアクセスした場合' do
    it 'ログイン画面が正常に表示されること' do
      visit new_user_session_path
      expect(page).to have_current_path(new_user_session_path)
    end
  end

  context 'ユーザーがログインページからユーザー登録画面へ遷移した場合' do
    it 'ユーザー登録画面が正常に表示されること' do
      visit new_user_session_path
      click_on 'こちら'
      expect(page).to have_current_path(new_user_registration_path)
    end
  end

  describe 'フォーム入力チェック' do
    before do
      visit new_user_registration_path
      fill_in '名前', with: name
      fill_in 'メールアドレス', with: email
      fill_in '電話番号', with: phone_number
      fill_in '生年月日', with: birthdate
      fill_in 'BeeBitsユーザー名', with: beebits_name
      fill_in 'パスワード', with: password
      fill_in 'パスワード(確認用)', with: password_confirmation
      click_on '登録'
    end

    let(:name) { '蜜蜂太郎' }
    let(:email) { 'beebits@example.com' }
    let(:phone_number) { '08012345678' }
    let(:birthdate) { '1995-01-01' }
    let(:beebits_name) { '@bee_bits123' }
    let(:password) { 'password123' }
    let(:password_confirmation) { 'password123' }

    context '正常なユーザー登録の場合' do
      it 'ユーザー登録ができること' do
        expect(page).to have_current_path(root_path)
      end
    end

    context '無効なユーザー登録の場合' do
      let(:name) { nil }
      let(:email) { nil }
      let(:phone_number) { nil }
      let(:birthdate) { nil }
      let(:beebits_name) { nil }
      let(:password) { nil }
      let(:password_confirmation) { nil }

      it '必須項目を入力せずに登録しようとするとエラーが表示されること' do
        expect(page).to have_content('メールアドレス を入力してください')
          .and have_content('パスワード を入力してください')
          .and have_content('名前 を入力してください')
          .and have_content('名前 は2文字以上で入力してください')
          .and have_content('メールアドレス は有効な形式で入力してください')
          .and have_content('生年月日 を入力してください')
          .and have_content('パスワード は8文字以上で入力してください')
          .and have_content('パスワード は英数字の組み合わせで8文字以上で入力してください')
          .and have_content('BeeBitsユーザー名 を入力してください')
          .and have_content('BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます')
          .and have_content('生年月日 の入力が正しくありません')
      end
    end

    context '名前のみ未入力の場合' do
      let(:name) { nil }

      it 'エラーが表示されること' do
        expect(page).to have_content '名前 を入力してください'
      end
    end

    context '名前が2文字未満の場合' do
      let(:name) { '蜂' }

      it 'エラーが表示されること' do
        expect(page).to have_content '名前 は2文字以上で入力してください'
      end
    end

    context '名前が51文字以上の場合' do
      let(:name) { '蜂' * 51 }

      it 'エラーが表示されること' do
        expect(page).to have_content '名前 は50文字以内で入力してください'
      end
    end

    context 'メールアドレスのみ未入力の場合' do
      let(:email) { nil }

      it 'エラーが表示されること' do
        expect(page).to have_content 'メールアドレス を入力してください'
      end
    end

    context 'メールアドレスの形式が無効な場合' do
      let(:email) { 'beebits_example.com' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'メールアドレス は有効な形式で入力してください'
      end
    end

    context 'メールアドレスの入力が255文字以上の場合' do
      let(:email) { "#{'a' * 243}@example.com" }

      it 'エラーが表示されること' do
        expect(page).to have_content 'メールアドレス は254文字以内で入力してください'
      end
    end

    context '電話番号のみ未入力の場合' do
      it 'エラーが表示されること' do
      end
    end

    context '国外の電話番号形式の場合' do
      let(:phone_number) { '17512345678' }

      it 'エラーが表示されること' do
        expect(page).to have_content '電話番号 は日本の携帯電話番号の形式で入力してください'
      end
    end

    context '生年月日のみ未入力の場合' do
      let(:birthdate) { nil }

      it 'エラーが表示されること' do
        expect(page).to have_content '生年月日 を入力してください'
      end
    end

    context '生年月日の形式が無効な場合' do
      let(:birthdate) { '1800-01-01' }

      it 'エラーが表示されること' do
        expect(page).to have_content '生年月日 の入力が正しくありません'
      end
    end

    context '生年月日が15歳未満の場合' do
      let(:birthdate) { '2020-01-01' }

      it 'エラーが表示されること' do
        expect(page).to have_content '生年月日 が15歳未満の方はご利用いただけません'
      end
    end

    context '生年月日が未来の場合' do
      let(:birthdate) { '2035-01-01' }

      it 'エラーが表示されること' do
        expect(page).to have_content '生年月日 の入力が正しくありません'
      end
    end

    context 'BeeBitsユーザー名のみ未入力の場合' do
      let(:beebits_name) { nil }

      it 'エラーが表示されること' do
        expect(page).to have_content 'BeeBitsユーザー名 を入力してください'
      end
    end

    context 'BeeBitsユーザー名が@を含めて16文字以上の場合' do
      let(:beebits_name) { '@bee_bits1234567' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'BeeBitsユーザー名 は@を含め15文字以内で入力してください'
      end
    end

    context 'BeeBitsユーザー名に@と_意外の記号が含まれる場合' do
      let(:beebits_name) { '@bee!bit?' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
      end
    end

    context 'BeeBitsユーザー名に@が2つ以上含まれる場合' do
      let(:beebits_name) { '@@beebits' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
      end
    end

    context 'パスワードのみ未入力の場合' do
      let(:password) { nil }

      it 'エラーが表示されること' do
        expect(page).to have_content 'パスワード を入力してください'
      end
    end

    context 'パスワードの入力が8文字未満の場合' do
      let(:password) { 'pass123' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'パスワード は8文字以上で入力してください'
      end
    end

    context 'パスワードの入力が英数の組み合わせで無い場合' do
      let(:password) { 'beebitspassword' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'パスワード は英数字の組み合わせで8文字以上で入力してください'
      end
    end

    context 'パスワードの入力が129文字以上の場合' do
      let(:password) { 'password123' * 12 }

      it 'エラーが表示されること' do
        expect(page).to have_content 'パスワード は128文字以内で入力してください'
      end
    end

    context '確認用パスワードの入力が一致しない場合' do
      let(:password_confirmation) { 'password54321' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'パスワード(確認用) が一致しません'
      end
    end
  end

  describe '重複時のエラー確認' do
    before do
      create(:user)
      visit new_user_registration_path
      fill_in '名前', with: name
      fill_in 'メールアドレス', with: email
      fill_in '電話番号', with: phone_number
      fill_in '生年月日', with: birthdate
      fill_in 'BeeBitsユーザー名', with: beebits_name
      fill_in 'パスワード', with: password
      fill_in 'パスワード(確認用)', with: password_confirmation
      click_on '登録'
    end

    let(:name) { '蜜蜂太郎' }
    let(:phone_number) { '08012345678' }
    let(:birthdate) { '1995-01-01' }
    let(:password) { 'password123' }
    let(:password_confirmation) { 'password123' }

    context 'メールアドレスが大文字小文字を区別せずに重複する場合' do
      let(:email) { 'BeeBits@example.com' }
      let(:beebits_name) { '@bee_bits2' }

      it 'エラーが表示されること' do
        expect(page).to have_content 'メールアドレス はすでに存在しています'
      end
    end

    context 'BeeBitsユーザー名が大文字小文字を区別せずに既に存在する場合' do
      let(:email) { 'Beebitstest@example.com' }
      let(:beebits_name) { '@bee_bits123' }

      it '、エラーが表示されること' do
        expect(page).to have_content 'BeeBitsユーザー名 はすでに存在しています'
      end
    end
  end
end
