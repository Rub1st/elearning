class CertificatesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    certificate = Certificate.new(permit_params)
    certificate.certificate_pdf.attach(io: File.open(permit_params[:certificate_pdf]), filename: 'file.pdf')
    if certificate.save
      certificate = Certificate.find(certificate.id)
      render json: certificate, status: 201
    else
      render json: { errors: certificate.errors }, status: :unprocessable_entity
    end
  end

  def update
    certificate = Certificate.find(params[:id])

    if certificate.update_attributes(permit_params)
      render json: certificate, status: 201
    else
      render json: { errors: certificate.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Certificate.find(params[:id]).destroy
  end

  def index
    render json: Certificate.all, status: :ok
  end

  def show
    render json: Certificate.find(params[:id]), status: :ok
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
