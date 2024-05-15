# frozen_string_literal: true

Rails.application.routes.draw do
  # Devise 認証用のルート
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  root 'timelines#index'
  resources :timelines
  post 'favorites/:id', to: 'favorites#create', as: 'add_to_favorites'
  delete 'favorites/:id', to: 'favorites#destroy', as: 'destroy_favorite'
  resources :reserve_posts, only: [:create]
end
