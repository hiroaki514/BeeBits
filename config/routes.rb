# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  get 'home/index'

  # Add Devise routes for user authentication
  # devise_for :users

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'home#index'
end
