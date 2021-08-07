module TimesheetEntries
  module Create
    module_function

    def call(user:, params:)
      start_at = Time.parse(params.delete(:start_at)) rescue nil
      end_at   = Time.parse(params.delete(:end_at)) rescue nil

      return Result.new(:error, "timesheet_id is required") unless params[:timesheet_id]
      return Result.new(:error, "Timesheet not found") unless user.timesheets_dataset[params.fetch(:timesheet_id).to_i]

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
