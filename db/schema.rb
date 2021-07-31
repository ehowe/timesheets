Sequel.migration do
  change do
    create_table(:pay_periods) do
      primary_key :id, :type=>:Bignum
      column :start_at, "timestamp with time zone", :null=>false
      column :end_at, "timestamp with time zone", :null=>false
      
      index [:end_at]
      index [:start_at]
    end
    
    create_table(:payroll_categories) do
      primary_key :id, :type=>:Bignum
      column :name, "text"
      
      index [:name]
      index [:name], :name=>:payroll_categories_name_key, :unique=>true
    end
    
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
      column :token, "text"
      column :admin, "boolean", :default=>false, :null=>false
      
      index [:email], :unique=>true
      index [:reset_password_token], :unique=>true
    end
    
    create_table(:timesheets) do
      primary_key :id, :type=>:Bignum
      foreign_key :user_id, :users, :type=>"bigint", :null=>false, :key=>[:id]
      foreign_key :pay_period_id, :pay_periods, :type=>"bigint", :null=>false, :key=>[:id]
      
      index [:pay_period_id]
      index [:user_id]
      index [:user_id, :pay_period_id], :unique=>true
    end
    
    create_table(:user_categories) do
      foreign_key :user_id, :users, :type=>"bigint", :null=>false, :key=>[:id]
      foreign_key :category_id, :payroll_categories, :type=>"bigint", :null=>false, :key=>[:id]
      
      index [:category_id]
      index [:user_id]
    end
    
    create_table(:timesheet_entries) do
      primary_key :id, :type=>:Bignum
      column :start_at, "timestamp with time zone", :null=>false
      column :end_at, "timestamp with time zone", :null=>false
      foreign_key :payroll_category_id, :payroll_categories, :type=>"bigint", :null=>false, :key=>[:id]
      foreign_key :timesheet_id, :timesheets, :type=>"bigint", :null=>false, :key=>[:id]
      
      index [:end_at]
      index [:payroll_category_id]
      index [:start_at]
      index [:timesheet_id]
    end
  end
end
              Sequel.migration do
                change do
                  self << "SET search_path TO \"$user\", public"
                  self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210731001357_add_users.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210731214112_add_token_to_users.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210801112240_create_sheets_schema.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210801172232_add_admin_to_users.rb')"
                end
              end
