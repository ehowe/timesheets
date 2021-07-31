# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :users do
      add_column :admin, :boolean, null: false, default: false
    end
  end
end
