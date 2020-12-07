class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: lambda {
    Rails.env.development? && ENV['SKIP_VERIFY_AUTHENTICITY_TOKEN']
  }

  def render_jsonapi_response(resource)
    if resource.errors.empty?
      render json: resource
    else
      render json: resource.errors, status: 400
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name login password email birthday])
  end
end
