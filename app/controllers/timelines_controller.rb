# frozen_string_literal: true

class TimelinesController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      redirect_to timelines_path, notice: '投稿が作成されました'
    else
      redirect_to timelines_path, alert: '投稿の作成に失敗しました'
    end
  end

  private

  def post_params
    params.permit(:body, :user_id, :post_content)
  end
end
