class User < Sequel::Model
  dataset_module do
    def order_by_last_name
      order(:last_name)
    end
  end

  plugin :devise

  devise :database_authenticatable, :recoverable, :registerable

  many_to_many :payroll_categories,
    class: "PayrollCategory",
    join_table: :user_categories,
    left_key: :user_id,
    right_key: :category_id

  one_to_many :timesheets,
    dataset: -> { Timesheet.order_by_desc_pay_period_end.where(user_id: id) }

  def active_for_authentication?
    super && locked_at.nil?
  end

  def validate
    super

    errors.add(:email, "must be unique") if new? && User.where(email: self.email).count > 0
  end

  def make_admin!
    update(admin: true)
  end

  def revoke_admin!
    update(admin: false)
  end

  def password_edit_url
    raise ArgumentError.new("No password reset token found") unless reset_password_token

    host     = Rails.application.routes.default_url_options[:host]
    protocol = Rails.application.routes.default_url_options[:protocol]

    raise ArgumentError.new("No host or protocol found") unless host && protocol

    uri              = Addressable::URI.parse("#{protocol}://#{host}/users/#{id}/password/edit")
    uri.query_values = {"token" => reset_password_token}

    uri.to_s
  end
end
