module Users
  module List
    module_function

    def call(user:)
      return Result.new(:error, "User is not an admin") unless user.admin

      presenters = User.order_by_last_name.all.map { |u| UserPresenter.display(u) }

      Result.new(:ok, presenters)
    end
  end
end
