class ActivateMotivationJob < ApplicationJob
  queue_as :default

  def perform(*args)
    WelcomeMailer.activate_motivation(self).deliver
  end
end
