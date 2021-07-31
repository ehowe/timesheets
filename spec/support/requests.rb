require "faraday"
require "faraday_middleware"
require "faraday/adapter/rack"
require "oj"

module RequestHelper
  module Client
    [:get, :put, :post, :delete].each do |method|
      define_method method do |path, args={}|
        @response = client.send(method, path) do |request|
          request.params  = args[:params] || {}
          request.params.merge!(token: token) if respond_to?(:token)
          request.headers = (args[:headers] || {}).merge(Authorization: ENV["API_PASSWORD"], Accept: "application/json")

          if [:put, :post].include?(method)
            request.body = Oj.dump(args[:body])
          end
        end
      end
    end

    def response
      @response
    end

    def app
      @app ||= Rack::Builder.parse_file("config.ru").first
    end

    def client
      @client ||= Faraday.new do |b|
        b.response :json, content_type: /\bjson$/

        b.adapter Faraday::Adapter::Rack, app
      end
    end
  end

  RSpec.configure do |c|
    c.include Client, type: :request
  end
end

RSpec.configure do
end
