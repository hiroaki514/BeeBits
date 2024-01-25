# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    before_action :configure_sign_in_params, only: [:create]

    def create; end

    protected

    def configure_sign_in_params
      params.require(:user).permit(:beebits_name, :password, :remember_me)
    end
  end
end
