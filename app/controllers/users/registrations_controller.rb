# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    private

    # Strong Parametersの設定
    def sign_up_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :phone_number, :birthdate,
                                   :beebits_name)
    end

    def account_update_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :phone_number,
                                   :birthdate, :beebits_name)
    end
  end
end
