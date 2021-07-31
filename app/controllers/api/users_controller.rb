module Api
  class UsersController < ApplicationController
    def index
      render json: User.all
    end

    def destroy
      user = User.find(params[:id])
      user.destroy
      render json: {}, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end
  end
end
