require 'mail'
# Use this hook to configure devise mailer, warden hooks and so forth.
# Many of these configuration options can be set straight in your model.
Devise.setup do |config|
  address = Mail::Address.new 'dnd@daveallie.com'
  address.display_name = 'D&Dave'
  config.mailer_sender = address.format

  # ==> ORM configuration
  # Load and configure the ORM. Supports :active_record (default) and
  # :mongoid (bson_ext recommended) by default. Other ORMs may be
  # available as additional gems.
  require 'devise/orm/active_record'

  config.authentication_keys = [:login]

  # Configure parameters from the request object used for authentication. Each entry
  # given should be a request method and it will automatically be passed to the
  # find_for_authentication method and considered in your model lookup. For instance,
  # if you set :request_keys to [:subdomain], :subdomain will be used on authentication.
  # The same considerations mentioned for authentication_keys also apply to request_keys.
  # config.request_keys = []

  config.case_insensitive_keys = [:username, :email]
  config.strip_whitespace_keys = [:username, :email]
  config.skip_session_storage = [:http_auth]

  config.stretches = Rails.env.test? ? 1 : 10

  config.reconfirmable = true

  config.confirmation_keys = [:username]

  config.expire_all_remember_me_on_sign_out = true

  config.password_length = 8..72

  config.reset_password_keys = [:username]
  config.reset_password_within = 6.hours

  config.sign_out_via = :delete
end
