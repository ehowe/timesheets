class BasePresenter
  attr_reader :object, :options

  def self.display(object, options={})
    new(object: object, options: options).attributes.with_indifferent_access
  end

  def initialize(object:, options:)
    @object  = object
    @options = options
  end
end
