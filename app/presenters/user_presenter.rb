class UserPresenter < BasePresenter
  def attributes
    {
      email:      object.email,
      first_name: object.first_name,
      last_name:  object.last_name,
    }
  end
end
