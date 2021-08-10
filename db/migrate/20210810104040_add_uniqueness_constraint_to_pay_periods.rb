# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :pay_periods do
      add_unique_constraint([:start_at, :end_at, :payroll_schedule_id], name: :unique_dates_in_schedule)
    end
  end
end
