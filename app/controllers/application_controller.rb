class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  impersonates :user

  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: lambda {
    Rails.env.development? && ENV['SKIP_VERIFY_AUTHENTICITY_TOKEN']
  }

  before_action :set_locale

  def set_locale
    if user_signed_in?
      I18n.locale = current_user.language
    else
      I18n.locale = params[:lang] || locale_from_header || I18n.default_locale
    end
  end

  def locale_from_header
    request.env.fetch('HTTP_ACCEPT_LANGUAGE', '').scan(/[a-z]{2}/).first
  end

  rescue_from ActionPolicy::Unauthorized do
    render plain: '401 unauthorized', status: :unauthorized
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name login password email language])
  end
end
