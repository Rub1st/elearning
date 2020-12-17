class CertificatesController < ApplicationController
  def create
    certificate = Certificate.new(permit_params)
    certificate.certificate_pdf.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: 'file.jpg')
    if certificate.save
      render json: certificate
    else
      render json: { errors: certificate.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: certificates
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: certificates.search(search)
    else
      render json: certificates
    end
  end

  private

  def certificates
    Certificate.where(user_id: current_user[:id])
  end

  def permit_params
    params.require(:certificate).permit(
      :course_id,
      :user_id,
      :certificate_pdf
    )
  end
end
