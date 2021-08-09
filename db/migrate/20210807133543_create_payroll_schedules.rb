# frozen_string_literal: true

Sequel.migration do
  up do
    create_table :payroll_schedules do
      primary_key :id

      column :start_on,       :timestamptz, null: false
      column :length_in_days, :integer,     null: false
    end

    alter_table :payroll_schedules do
      set_column_type :id, :bigint
    end
  end

  down do
    drop_table :payroll_schedules
  end
end
