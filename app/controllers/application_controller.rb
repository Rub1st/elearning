class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_locale

  impersonates :user

  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: lambda {
    Rails.env.development? && ENV['SKIP_VERIFY_AUTHENTICITY_TOKEN']
  }

  def set_locale
    I18n.locale = if user_signed_in?
                    current_user.language
                  else
                    params[:lang] || locale_from_header || I18n.default_locale
                  end
  end

  def locale_from_header
    request.env.fetch('HTTP_ACCEPT_LANGUAGE', '').scan(/[a-z]{2}/).first
  end

  rescue_from ActionPolicy::Unauthorized do
    render plain: '401 unauthorized', status: :unauthorized
  end

  def render_created_data(check, data)
    if check.save
      render json: data
    else
      render json: { errors: check.errors }, status: :unprocessable_entity
    end
  end

  def render_updated_data(check, params, data)
    if check.update(params)
      render json: data
    else
      render json: { errors: check.errors }, status: :unprocessable_entity
    end
  end

  def render_search_data(collection)
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: collection.search(search)
    else
      render json: collection.all
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name login password email language])
  end
end
