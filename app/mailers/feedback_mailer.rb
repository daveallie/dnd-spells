require 'mail'

class FeedbackMailer < ApplicationMailer
  address = Mail::Address.new 'dnd-feedback@daveallie.com'
  address.display_name = 'D&Dave Feedback'
  default from: address.format

  def feedback_email(information, feedback)
    @information = information
    @feedback = feedback

    mail(to: 'info@daveallie.com', subject: "Feedback from #{@information.has_key?(:user) ? "user: #{@information[:user].username}" : "guest: #{@information[:name]}"}")
  end
end
