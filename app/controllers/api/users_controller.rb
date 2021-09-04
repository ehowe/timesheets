module Api
  class UsersController < ApplicationController
    before_action :fetch_user

    def payroll_categories
      operation = PayrollCategories::List.(user: current_user)

      unless operation.success?
        render json: operation.result, status: 422 and return
      end

      render json: { payroll_categories: operation.result } and return
    end
  end
end
