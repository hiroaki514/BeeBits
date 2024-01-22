# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    # 新規登録画面表示

    # アカウント編集画面表示

    # 新規登録処理

    # アカウント更新処理

    # アカウント削除画面表示

    # ... 他のDeviseのRegistrationsControllerのアクションをオーバーライド

    private

    # Strong Parametersの設定
    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :phone_number, :birthdate,
                                   :BeeBits_id)
    end

    def account_update_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :phone_number,
                                   :birthdate, :BeeBits_id)
    end
  end
end
