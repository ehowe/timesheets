FactoryBot.define do
  factory :user do
    sequence(:email)      { |n| "test-#{n.to_s.rjust(3, "0")}@example.com" }
    sequence(:first_name) { |n| "First#{n}" }
    sequence(:last_name)  { |n| "Last#{n}" }

    password              { "pass" }
    password_confirmation { "pass" }

    trait :admin do
      admin { true }
    end
  end
end
