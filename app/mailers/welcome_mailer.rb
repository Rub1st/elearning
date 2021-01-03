class WelcomeMailer < ApplicationMailer
  def welcome_send(user)
    @user = user
    mail to: user.email, subjuct: 'Welcome for my site', from: 'info@mysite.com'
  end
end
