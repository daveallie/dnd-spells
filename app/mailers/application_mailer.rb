require 'mail'

class ApplicationMailer < ActionMailer::Base
  address = Mail::Address.new 'dnd@daveallie.com'
  address.display_name = 'D&Dave'
  default from: address.format
  layout 'mailer'
end
