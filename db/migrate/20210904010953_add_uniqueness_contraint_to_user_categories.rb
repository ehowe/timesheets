# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :user_categories do
      add_unique_constraint([:user_id, :category_id])
    end
  end
end
