Rails.application.routes.draw do
  # We are defining the controllers paths avoding to search them from an `api`
  # folder.
  devise_for :users, controllers: {
    confirmations: "devise/confirmations",
    passwords:     "devise/passwords",
    sessions:      "sessions",
    unlocks:       "devise/unlocks"
  }

  # ~~~~ Application Resources ~~~~
  resources :users

  get "/users/check_for_user", to: "users#check_for_user"
  root "pages#index", as: :pages_index
end
