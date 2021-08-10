# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :pay_periods do
      add_foreign_key :payroll_schedule_id, :payroll_schedules, index: true
    end
  end
end
