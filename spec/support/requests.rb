require "faraday"
require "faraday_middleware"
require "faraday/adapter/rack"
require "oj"

module RequestHelper
  module Client
    [:get, :put, :post, :delete].each do |method|
      define_method method do |path, args={}|
        @response = client.send(method, path) do |request|
          request.params  = args[:params]   || {}
          request.headers = (args[:headers] || {}).merge("Accept" => "application/json", "Content-Type" => "application/json")

          if [:put, :post].include?(method)
            request.headers.merge("Content-Type" => "application/json")

            body = args[:body] || {}

            request.params = body
          elsif [:get, :delete].include?(method)
            request.params.merge!(token: token) if respond_to?(:token)
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

    def authenticate_user(user)
      expect_any_instance_of(Warden::Proxy).to receive(:authenticate!).and_return(user)

      post(user_session_path, body: { user: { email: user.email, password: "pass" } })

      token = response.headers["Set-Cookie"]&.split(" ")&.grep(/jwt=/)&.first&.split("=")&.last&.chomp(";")

      user.token = CGI.unescape(token) if token
    end
  end

  RSpec.configure do |c|
    c.include Client, type: :request
  end
end
