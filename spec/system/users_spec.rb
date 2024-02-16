# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :system do
  it 'ユーザー登録ページにアクセスできること' do
    visit new_user_registration_path
    expect(page).to have_content 'アカウントを作成'
  end

  context '正常なユーザー登録の場合' do
    it 'ユーザー登録ができること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'test@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'Timelines#index'
    end
  end

  context '無効なユーザー登録' do
    it '必須項目を入力せずに登録しようとするとエラーメッセージが表示されること' do
      visit new_user_registration_path
      click_on '登録'
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

    it '名前のみ未入力の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: ''
      fill_in 'メールアドレス', with: 'test@example.com'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '名前 を入力してください'
    end

    it '名前が2文字未満の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜂'
      fill_in 'メールアドレス', with: 'test@example.com'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '名前 は2文字以上で入力してください'
    end

    it '名前が51文字以上の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜂' * 51
      fill_in 'メールアドレス', with: 'test@example.com'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '名前 は50文字以内で入力してください'
    end

    it 'メールアドレスのみ未入力の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: ''
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'メールアドレス を入力してください'
    end

    it 'メールアドレスの形式が無効な場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'メールアドレス は有効な形式で入力してください'
    end

    it 'メールアドレスが大文字小文字を区別せずに既に存在する場合、エラーメッセージが表示されること' do
      create(:user, email: 'BeeBits@example.com')

      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'メールアドレス はすでに存在しています'
    end

    it 'メールアドレスの入力が255文字以上の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: "#{'a' * 254}@example.com"
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'メールアドレス は254文字以内で入力してください'
    end

    it '電話番号のみ未入力の場合、エラーメッセージが表示されること' do
    end

    it '国内以外の電話番号の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '01012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '電話番号 は日本の携帯電話番号の形式で入力してください'
    end

    it '生年月日のみ未入力の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: ''
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '生年月日 を入力してください'
    end

    it '生年月日の形式が無効な場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1800-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '生年月日 の入力が正しくありません'
    end

    it '生年月日が15歳未満の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '2024-01-01'
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '生年月日 が15歳未満の方はご利用いただけません'
    end

    it '生年月日が未来の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: (Time.zone.today + 1.day).strftime('%Y-%m-%d')
      fill_in 'BeeBitsユーザー名', with: '@test123'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content '生年月日 が15歳未満の方はご利用いただけません'
    end

    it 'BeeBitsユーザー名のみ未入力の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: ''
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'BeeBitsユーザー名 を入力してください'
    end

    it 'BeeBitsユーザー名が大文字小文字を区別せずに既に存在する場合、エラーメッセージが表示されること' do
      create(:user, beebits_name: '@BeeBits')

      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'BeeBitsユーザー名 はすでに存在しています'
    end

    it 'BeeBitsユーザー名が@を含めて16文字以上の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits_test_user'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'BeeBitsユーザー名 は@を含め15文字以内で入力してください'
    end

    it 'BeeBitsユーザー名に@と_意外の記号が含まれる場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@bee!bits'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
    end

    it 'BeeBitsユーザー名に@が2つ以上含まれる場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@@beebits'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'BeeBitsユーザー名 は英数字とアンダーバー(_)のみが使用できます'
    end

    it 'パスワードのみ未入力の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: ''
      fill_in 'パスワード(確認用)', with: 'password123'
      click_on '登録'
      expect(page).to have_content 'パスワード を入力してください'
    end

    it 'パスワードの入力が8文字未満の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: 'pass123'
      fill_in 'パスワード(確認用)', with: 'pass123'
      click_on '登録'
      expect(page).to have_content 'パスワード は8文字以上で入力してください'
    end

    it 'パスワードの入力が英数の組み合わせで無い場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: 'passwordtest'
      fill_in 'パスワード(確認用)', with: 'passwordtest'
      click_on '登録'
      expect(page).to have_content 'パスワード は英数字の組み合わせで8文字以上で入力してください'
    end

    it 'パスワードの入力が129文字以上の場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: 'password' * 33
      fill_in 'パスワード(確認用)', with: 'password' * 33
      click_on '登録'
      expect(page).to have_content 'パスワード は128文字以内で入力してください'
    end

    it '確認用パスワードの入力が一致しない場合、エラーメッセージが表示されること' do
      visit new_user_registration_path
      fill_in '名前', with: '蜜蜂太郎'
      fill_in 'メールアドレス', with: 'beebits@example.com'
      fill_in '電話番号', with: '08012345678'
      fill_in '生年月日', with: '1995-01-01'
      fill_in 'BeeBitsユーザー名', with: '@beebits'
      fill_in 'パスワード', with: 'password123'
      fill_in 'パスワード(確認用)', with: 'password1234'
      click_on '登録'
      expect(page).to have_content 'パスワード(確認用) が一致しません'
    end
  end
end
