class CertificatesController < ApplicationController

  def create
    certificate = Certificate.new(permit_params)
    certificate.certificate_pdf.attach(io: File.open(permit_params[:certificate_pdf]), filename: 'file.pdf')
    if certificate.save
      render json: certificate
    else
      render json: { errors: certificate.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: Certificate.all
  end

  def show
    render json: Certificate.find(params[:id])
  end

  private

  def permit_params
    params.require(Certificate.name.underscore.to_sym).permit(
      :course_id,
      :user_id,
      :certificate_pdf
    )
  end
end
