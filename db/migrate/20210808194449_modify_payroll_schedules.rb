# frozen_string_literal: true

Sequel.migration do
  up do
    alter_table :payroll_schedules do
      drop_column :start_on
      add_column :start_date, :text, null: false
      add_column :start_time, :text, null: false
      add_column :timezone,   :text, null: false
    end
  end

  down do
    alter_table :payroll_schedules do
      drop_column :timezone
      drop_column :start_time
      drop_column :start_date
      add_column :start_on, :timezonetz, null: false
    end
  end
end
