# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Devise 認証用のルート
      devise_for :users, controllers: {
        registrations: 'users/registrations',
        sessions: 'users/sessions'
      }

      resources :timelines
      resources :users, only: [:show] do
        resource :profile, only: %i[show edit update], controller: 'profiles'
      end

      post 'favorites/:id', to: 'favorites#create', as: 'add_to_favorites'
      delete 'favorites/:id', to: 'favorites#destroy', as: 'destroy_favorite'

      resources :reserve_post_timelines, only: [:create]
    end
  end

  # フロントエンドのルートをすべてReactに任せる
  root 'timelines#index'
  get '*path', to: 'timelines#index', constraints: ->(request) { !request.xhr? && request.format.html? }
end
