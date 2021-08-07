Rails.application.routes.draw do
  # We are defining the controllers paths avoding to search them from an `api`
  # folder.
  scope :api, constraints: { format: :json } do
    devise_for :users, controllers: {
      registrations: "users/registrations",
      sessions:      "users/sessions",
    }

    resources :users, only: [] do
      member do
        resources :timesheets, only: [:create, :destroy, :show, :update, :index] do
          member do
            resources :entries, only: [:create, :destroy, :update, :index]
          end
        end
      end
    end
  end

  root "pages#index", as: :pages_index

  match "*path", to: "pages#index", via: :all
end
