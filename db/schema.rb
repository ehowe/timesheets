Sequel.migration do
  change do
    create_table(:payroll_categories) do
      primary_key :id, :type=>:Bignum
      column :name, "text"
      
      index [:name]
      index [:name], :name=>:payroll_categories_name_key, :unique=>true
    end
    
    create_table(:payroll_schedules) do
      primary_key :id, :type=>:Bignum
      column :length_in_days, "integer", :null=>false
      column :start_date, "text", :null=>false
      column :start_time, "text", :null=>false
      column :timezone, "text", :null=>false
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
      column :locked_at, "timestamp with time zone"
      
      index [:email], :unique=>true
      index [:reset_password_token], :unique=>true
    end
    
    create_table(:pay_periods) do
      primary_key :id, :type=>:Bignum
      column :start_at, "timestamp with time zone", :null=>false
      column :end_at, "timestamp with time zone", :null=>false
      foreign_key :payroll_schedule_id, :payroll_schedules, :null=>false, :key=>[:id]
      
      index [:end_at]
      index [:start_at]
      index [:start_at, :end_at, :payroll_schedule_id], :name=>:unique_dates_in_schedule, :unique=>true
    end
    
    create_table(:user_categories) do
      foreign_key :user_id, :users, :type=>"bigint", :null=>false, :key=>[:id]
      foreign_key :category_id, :payroll_categories, :type=>"bigint", :null=>false, :key=>[:id]
      
      index [:category_id]
      index [:user_id]
    end
    
    create_table(:timesheets) do
      primary_key :id, :type=>:Bignum
      foreign_key :user_id, :users, :type=>"bigint", :null=>false, :key=>[:id]
      foreign_key :pay_period_id, :pay_periods, :type=>"bigint", :null=>false, :key=>[:id]

      index [:pay_period_id]
      index [:user_id]
      index [:user_id, :pay_period_id], :unique=>true
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
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210807133543_create_payroll_schedules.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210808194449_modify_payroll_schedules.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210810013341_add_payroll_schedule_id_to_pay_periods.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210810103125_set_payroll_schedule_id_not_null_on_pay_periods.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210810104040_add_uniqueness_constraint_to_pay_periods.rb')"
self << "INSERT INTO \"schema_migrations\" (\"filename\") VALUES ('20210810171025_add_locked_to_users.rb')"
                end
              end
