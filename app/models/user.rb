# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name phone_number birthdate BeeBits_id])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name phone_number birthdate BeeBits_id])
  end
end
