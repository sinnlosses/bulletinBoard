Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      resources :categories, only: [:index, :create, :show]
      get 'statistics', to: 'categories#statistics'
      delete 'categories/:id', to: 'categories#destroy'
      put 'categories/:id', to: 'categories#update'

      resources :comments, only: [:index, :create]
      put 'comments/:id', to: 'comments#show_or_hide'
      
      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end

end
