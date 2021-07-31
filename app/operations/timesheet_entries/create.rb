module TimesheetEntries
  module Create
    module_function

    def call(params)
      start_at = Time.parse(params.delete(:start_at)) rescue nil
      end_at   = Time.parse(params.delete(:end_at)) rescue nil

      TimesheetEntry.db.transaction do
        begin
          entry = TimesheetEntry.find_or_create(params.symbolize_keys.merge(start_at: start_at, end_at: end_at))

          Result.new(:ok, TimesheetEntryPresenter.display(entry))
        rescue => e
          return Result.new(:error, e.message) if e.class.name == "Sequel::ValidationFailed"

          Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
