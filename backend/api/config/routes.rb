Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      resources :helloworld, only: :index
      resources :categories, only: [:index, :create, :show]
      resources :comments, only: [:index, :create, :findby_categoryid]
      
    end
  end
end
