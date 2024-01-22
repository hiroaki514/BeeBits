# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!, except: [:method_that_does_not_require_authentication]

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name phone_number birthdate password BeeBits_id])
  end

  # ログイン後のリダイレクト先を設定
  def after_sign_in_path_for(_resource)
    root_path
  end

  # ユーザー登録後のリダイレクト先を設定
  def after_sign_up_path_for(_resource)
    new_user_session_path
  end

  # ログアウト後のリダイレクト先を設定
  def after_sign_out_path_for(_resource_or_scope)
    new_user_session_path
  end
end
