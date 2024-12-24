# frozen_string_literal: true

# rubocop:disable all
module Users
  class SessionsController < Devise::SessionsController
    before_action :configure_sign_in_params, only: [:create]

    # ログイン後のリダイレクト先を設定
    def after_sign_in_path_for(resource)
      "http://localhost:5173/timelines" # Reactアプリのタイムライン画面
    end

    protected

    def configure_sign_in_params
      params.require(:user).permit(:beebits_name, :password, :remember_me)
    end
  end
end
