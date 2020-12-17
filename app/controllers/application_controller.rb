class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

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

  # def render_jsonapi_response(resource)
  #   if resource.errors.empty?
  #     render json: resource
  #   else
  #     render json: resource.errors, status: 400
  #   end
  # end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name login password email language])
  end
end
