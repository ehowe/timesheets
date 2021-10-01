class UserPresenter < BasePresenter
  def attributes
    {
      admin:      object.admin,
      email:      object.email,
      first_name: object.first_name,
      full_name:  object.full_name,
      id:         object.id,
      last_name:  object.last_name,
      locked:     !!object.locked_at,
    }
  end
end
