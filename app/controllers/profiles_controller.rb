# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :authenticate_user!, only: %i[edit update]
  before_action :set_user

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
end
