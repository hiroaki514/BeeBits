# frozen_string_literal: true

# rubocop:disable all
module Users
  class SessionsController < Devise::SessionsController
    before_action :configure_sign_in_params, only: [:create]

    protected

    def configure_sign_in_params
      params.require(:user).permit(:beebits_name, :password, :remember_me)
    end
  end
end
