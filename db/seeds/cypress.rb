User.where(first_name: "Test", last_name: "User").first || User.create(first_name: "Test", last_name: "User", email: "test@test.com", password: "asdf", password_confirmation: "asdf")
