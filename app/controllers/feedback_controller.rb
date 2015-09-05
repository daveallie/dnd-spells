class FeedbackController < ApplicationController
  def index
  end

  def save
    if params[:feedback].blank?
      flash[:error] = 'You must enter text into the feedback form!'
    else
      if signed_in?
        FeedbackMailer.feedback_email({user: current_user}, params[:feedback]).deliver_later
      else
        FeedbackMailer.feedback_email({name: params.has_key?(:name) ? params[:name] : '', email: params.has_key?(:email) ? params[:email] : ''}, params[:feedback]).deliver_later
      end

      flash[:success] = 'Thank you for your feedback!'
    end
    redirect_to feedback_path
  end
end
