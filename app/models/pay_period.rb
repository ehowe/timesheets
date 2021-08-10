class PayPeriod < Sequel::Model
  dataset_module do
    def by_end_at_desc
      order(Sequel.desc(:end_at))
    end
  end

  many_to_one :payroll_schedule
end
