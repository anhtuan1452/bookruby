Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :authors, only: [:index, :show, :create, :update, :destroy]
      resources :books, only: [:index, :show, :create, :update, :destroy]
    end
  end
  
  get 'health', to: 'health#index'
end
