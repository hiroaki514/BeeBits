# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'

  # Add Devise routes for user authentication
  devise_for :users

  # Redirect to login page after sign up
  devise_scope :user do
    post 'users/sign_up', to: 'devise/sessions#new'
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'home#index'
end
