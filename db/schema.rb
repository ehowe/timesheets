Sequel.migration do
  change do
    create_table(:schema_migrations) do
      column :filename, "text", :null=>false
      
      primary_key [:filename]
    end
    
    create_table(:users) do
      primary_key :id
      column :first_name, "text", :null=>false
      column :last_name, "text", :null=>false
      column :email, "text", :null=>false
      column :encrypted_password, "text", :null=>false
      column :reset_password_token, "text"
      column :reset_password_sent_at, "timestamp with time zone"
      column :remember_created_at, "timestamp with time zone"
      column :sign_in_count, "integer", :default=>0, :null=>false
      column :current_sign_in_at, "timestamp with time zone"
      column :last_sign_in_at, "timestamp with time zone"
      column :current_sign_in_ip, "inet"
      column :last_sign_in_ip, "inet"
      
      index [:email], :unique=>true
      index [:reset_password_token], :unique=>true
    end
  end
end
Sequel.migration do
  change do
    self << "SET search_path TO \"$user\", public"
    self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210731001357_add_users.rb')"
  end
end
