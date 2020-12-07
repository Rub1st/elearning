class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    # binding.irb
  end
end