class User < ApplicationRecord

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone_number, :birthdate, :BeeBits_id])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :phone_number, :birthdate, :BeeBits_id])
  end
end
