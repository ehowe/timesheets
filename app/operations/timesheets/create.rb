module Timesheets
  module Create
    module_function

    def call(user:, params:)
      Timesheet.db.transaction do
        begin
          ts = Timesheet.find_or_create(params.symbolize_keys.merge(user_id: user.id))

          Result.new(:ok, TimesheetPresenter.display(ts))
        rescue => e
          return Result.new(:error, e.message) if e.class.name == "Sequel::ValidationFailed"

          Result.new(:error, "Unknown error")
        end
      end
    end
  end
end
