module Devise
  module Strategies
    class JsonWebToken < Base
      def valid?
        request.headers["Authorization"].present?
      end

      def authenticate!
        return fail! unless claims
        return fail! unless claims.key?("user_id")

        success! User.find_by(id: claims["user_id"])
      end

      protected

      def claims
        strategy, token = request.headers["Authorization"].split(" ")

        return nil if (strategy || "").casecmp("bearer") != 0

        JWTWrapper.decode(token)
      rescue StandardError
        nil
      end
    end
  end
end
