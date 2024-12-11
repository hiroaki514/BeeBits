# frozen_string_literal: true

Rails.application.routes.draw do
  root 'admin/users#index'

  # Devise 認証用のルート
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  namespace :api do
    resources :timelines
    resources :users, only: [:show] do
      resource :profile, only: %i[show edit update], controller: 'profiles'
    end

    post 'favorites/:id', to: 'favorites#create', as: 'add_to_favorites'
    delete 'favorites/:id', to: 'favorites#destroy', as: 'destroy_favorite'
  end
end
