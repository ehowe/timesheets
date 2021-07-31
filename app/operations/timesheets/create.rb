module Timesheets
  module Create
    module_function

    def call(params)
      Timesheet.db.transaction do
        begin
          ts = Timesheet.find_or_create(params.symbolize_keys)

          Result.new(:ok, TimesheetPresenter.display(ts))
        rescue => e
          return Result.new(:error, e.message) if e.class.name == "Sequel::ValidationFailed"

          Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
