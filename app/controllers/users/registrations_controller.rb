
class Users::RegistrationsController < Devise::RegistrationsController
  # 新規登録画面表示
  def new
    super
  end

  # 新規登録処理
  def create
    super
  end

  # アカウント編集画面表示
  def edit
    super
  end

  # アカウント更新処理
  def update
    super
  end

  # アカウント削除画面表示
  def destroy
    super
  end

  # ... 他のDeviseのRegistrationsControllerのアクションをオーバーライド

  private

  # Strong Parametersの設定
  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :phone_number, :birthdate, :BeeBits_id)
  end

  def account_update_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password, :phone_number, :birthdate, :BeeBits_id)
  end
end
