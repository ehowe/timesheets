class UserPresenter < BasePresenter
  def attributes
    p object
    {
      admin:      object.admin,
      email:      object.email,
      first_name: object.first_name,
      full_name:  "#{object.first_name} #{object.last_name}",
      id:         object.id,
      last_name:  object.last_name,
      token:      JwtWrapper.encode(user_id: object.id),
    }
  end
end
