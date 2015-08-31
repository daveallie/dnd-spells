class FeedbackMailer < ApplicationMailer
  default from: 'dnd-feedback@daveallie.com'

  def feedback_email(information, feedback)
    @information = information
    @feedback = feedback
    mail(to: 'info@daveallie.com', subject: 'D&Dave Feedback')
  end
end
