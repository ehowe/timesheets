require "sequel/model"

class User < ::Sequel::Model
  plugin :devise

  devise :database_authenticatable, :recoverable
end
