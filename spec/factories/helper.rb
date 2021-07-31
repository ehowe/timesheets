module FactoryBot
  class Definition
    def to_create(&block)
      @to_create = -> (instance) { instance.save }
    end
  end
end
