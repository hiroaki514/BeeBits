# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params, only: [:create]

    private

    # Strong Parametersの設定
    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :phone_number, :birthdate, :beebits_name)
    end

    # 新規登録時のStrong Parametersを設定
    def configure_sign_up_params
      # beebits_nameの冒頭に＠を自動で追加する処理
      params[:user][:beebits_name] = "@#{params[:user][:beebits_name]}" unless params[:user][:beebits_name].blank?
    end

    def account_update_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :phone_number, :birthdate, :beebits_name)
    end
  end
end
