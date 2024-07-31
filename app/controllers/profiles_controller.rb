# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :set_user
  before_action :authenticate_user!, only: %i[edit update]
  before_action :authorize_user!, only: %i[edit update]

  def show
    @timelines = @user.timelines.order(created_at: :desc)
  end

  def edit; end

  def update
    # パスワードのバリデーションをスキップするフラグを設定
    @user.skip_password_validation = true
    if @user.update(profile_params)
      redirect_to user_profile_path(@user), notice: 'プロフィールが更新されました。'
    else
      render :edit
    end
  end

  private

  # ユーザーをセットするメソッド
  def set_user
    @user = User.find(params[:user_id])
  end

  # プロフィールのパラメータを許可するメソッド
  def profile_params
    params.require(:user).permit(:name, :bio)
  end

  # 編集権限を確認するメソッド
  def authorize_user!
    redirect_to root_path, alert: '権限がありません。' unless @user == current_user
  end
end
