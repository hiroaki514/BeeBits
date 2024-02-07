# frozen_string_literal: true

Rails.application.routes.draw do
# Devise 認証用のルート
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  root 'timelines#index'

end
