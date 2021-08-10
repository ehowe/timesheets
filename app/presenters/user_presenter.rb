class UserPresenter < BasePresenter
  def attributes
    {
      admin:      object.admin,
      email:      object.email,
      first_name: object.first_name,
      full_name:  "#{object.first_name} #{object.last_name}",
      id:         object.id,
      last_name:  object.last_name,
      locked:     object.locked,
    }
  end
end
