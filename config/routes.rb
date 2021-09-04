Rails.application.routes.draw do
  # We are defining the controllers paths avoding to search them from an `api`
  # folder.
  scope :api, constraints: { format: :json } do
    devise_for :users, controllers: {
      passwords:     "users/passwords",
      registrations: "users/registrations",
      sessions:      "users/sessions",
    }

    resources :timesheets, only: [:create, :destroy, :show, :update, :index] do
      member do
        get :pay_period

        resources :entries, only: [:create, :destroy, :update, :index]
      end
    end

    namespace :admin do
      resources :payroll_categories
      resources :payroll_schedules
      resources :users do
        member do
          put :payroll_categories
          put :lock
        end
      end
    end

    resources :payroll_schedules, only: [:index, :show], module: "admin" do
      member do
        get :pay_periods
      end
    end

    get "/users/:id/payroll_categories", to: "users#payroll_categories"
  end

  root "pages#index", as: :pages_index

  match "*path", to: "pages#index", via: :all, constraints: -> (req) { !(req.fullpath =~ /^\/api\/.*/) }
end
