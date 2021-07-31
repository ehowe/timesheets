# frozen_string_literal: true

Sequel.migration do
  up do
    create_table :pay_periods do
      primary_key :id

      column :start_at, :timestamptz, null: false, index: true
      column :end_at,   :timestamptz, null: false, index: true
    end

    create_table :payroll_categories do
      primary_key :id

      column :name, :text, index: true, unique: true
    end

    create_table :timesheets do
      primary_key :id

      foreign_key :user_id, :users, index: true, type: :bigint, null: false
      foreign_key :pay_period_id, :pay_periods, index: true, type: :bigint, null: false

      index [:user_id, :pay_period_id], unique: true
    end

    create_table :timesheet_entries do
      primary_key :id

      column :start_at, :timestamptz, null: false, index: true
      column :end_at,   :timestamptz, null: false, index: true

      foreign_key :payroll_category_id, :payroll_categories, index: true, type: :bigint, null: false
      foreign_key :timesheet_id, :timesheets, index: true, type: :bigint, null: false
    end

    create_table :user_categories do
      foreign_key :user_id, :users, index: true, type: :bigint, null: false
      foreign_key :category_id, :payroll_categories, index: true, type: :bigint, null: false
    end

    [:pay_periods, :timesheets, :timesheet_entries, :payroll_categories].each do |table|
      alter_table table do
        set_column_type :id, :bigint
      end
    end
  end

  down do
    [:user_categories, :timesheet_entries, :timesheets, :payroll_categories, :pay_periods].each do |table|
      drop_table table
    end
  end
end
