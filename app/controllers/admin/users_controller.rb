class Admin::UsersController < AdminController
  def create
  end

  def index
    operation = Users::List.(user: current_user)

    render json: {}, status: 422 and return unless operation.success?

    render json: { users: operation.result }
  end

  def lock
  end
end
