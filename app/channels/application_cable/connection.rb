module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
    end

    def find_user
      user_id      = decoded_jwt["id"]
      current_user = User[user_id.to_i]

      if current_user
        current_user
      else
        reject_unauthorized_connection
      end
    end

    def decoded_jwt
      JwtWrapper.decode(
        Base64.decode64(
          Oj.load(
            Base64.decode64(cookies["jwt"].split("--").first)
          )["_rails"]["message"]
        ).delete_prefix('"').delete_suffix('"')
      )["value"]
    rescue
      {}
    end
  end
end
