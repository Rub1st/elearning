class OrganizationsController < ApplicationController

  def create
    organization = Organization.new(permit_params)
    organization.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: 'file.pdf')
    if organization.save
      render json: organization
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def update
    organization = Organization.find(params[:id])
    if organization.update(permit_params)
      render json: organization
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Organization.find(params[:id]).destroy
    render json: Organization.all
  end

  def index
    render json: Organization.all
  end

  def show
    render json: Organization.find(params[:id])
  end

  private

  def permit_params
    params.require(:organization).permit(
      :name,
      :description,
      :approve_status,
      :certificate_template
    )
  end
end
