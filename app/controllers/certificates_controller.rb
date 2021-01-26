class CertificatesController < ApplicationController
  def index
    authorize! certificates

    render json: certificates
  end

  def search
    render_search_data certificates
  end

  private

  def certificates
    Certificate.where(user_id: current_user[:id]).order(created_at: :asc, course_id: :asc)
  end

  def permit_params
    params.require(:certificate).permit(
      :course_id,
      :user_id,
      :certificate_pdf
    )
  end
end
