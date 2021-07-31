class BasePresenter
  attr_reader :object, :options

  def self.display(object, options={})
    new(object: object, options: options).attributes
  end

  def initialize(object:, options:)
    @object  = object
    @options = options
  end
end
