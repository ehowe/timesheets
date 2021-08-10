# frozen_string_literal: true

Sequel.migration do
  up do
    alter_table :pay_periods do
      set_column_not_null :payroll_schedule_id
    end
  end

  down do
    alter_table :pay_periods do
      set_column_null :payroll_schedule_id
    end
  end
end
