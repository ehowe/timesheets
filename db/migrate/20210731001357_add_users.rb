# frozen_string_literal: true

Sequel.migration do
  up do
    create_table :users do
      primary_key :id

      column :first_name, :text, null: false
      column :last_name,  :text, null: false

      # Devise
      column :email,                  :text, null: false
      column :encrypted_password,     :text, null: false
      column :reset_password_token,   :text
      column :reset_password_sent_at, :timestamptz
      column :remember_created_at,    :timestamptz
      column :sign_in_count,          :integer, default: 0, null: false
      column :current_sign_in_at,     :timestamptz
      column :last_sign_in_at,        :timestamptz
      column :current_sign_in_ip,     :inet
      column :last_sign_in_ip,        :inet

      index :email,                unique: true
      index :reset_password_token, unique: true
    end
  end

  down do
    drop_table :users
  end
end
