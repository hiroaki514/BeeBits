# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  #テスト用
  get 'home/index', to: 'home#index', as: 'home_index'

  root 'timelines#index'
end
