class DashboardController < ApplicationController
  layout 'application_covered'
  before_filter :authenticate_user!

  def index
  end
end
