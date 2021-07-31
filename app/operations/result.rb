class Result
  attr_reader :status, :result, :data

  def initialize(status, result, data = nil)
    @status, @result, @data = status, result, data
  end

  def success?
    status == :ok
  end

  def error
    { "message" => result }
  end

  module ConvenienceMethods

  end
end
