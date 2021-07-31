module Timesheets
  module List
    module_function

    # TODO: Pagination probably
    def call(user)
      # Reload the user for eager loading
      user = User.where(id: user.id)
        .eager(timesheets: :pay_period)
        .first

      sheets = user.timesheets.map do |sheet|
        TimesheetPresenter.display(sheet)
      end

      Result.new(:ok, { sheets: sheets })
    end
  end
end
