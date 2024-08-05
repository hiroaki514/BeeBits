# frozen_string_literal: true

Rails.application.routes.draw do
  # Devise 認証用のルート
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  root to: 'front#index'
  get '*path', to: 'front#index'

  resources :timelines
  resources :users, only: [:show] do
    resource :profile, only: %i[show edit update], controller: 'profiles'
  end
  post 'favorites/:id', to: 'favorites#create', as: 'add_to_favorites'
  delete 'favorites/:id', to: 'favorites#destroy', as: 'destroy_favorite'
  resources :reserve_post_timelines, only: [:create]
end
