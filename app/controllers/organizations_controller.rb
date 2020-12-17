class OrganizationsController < ApplicationController
  def create
    organization = Organization.new(permit_params)

    if permit_params[:certificate_template].present?
      organization.certificate_template.attach(permit_params[:certificate_template])
    else
      organization.certificate_template.attach(io: File.open('/home/akira/Desktop/noimage.jpg'), filename: 'noiamge.jpg')
    end

    if organization.save
      render json: organization
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def update
    organization = Organization.find(params[:id])

    if permit_params[:certificate_template].present?
      organization.certificate_template.purge
      organization.certificate_template.attach(permit_params[:certificate_template])
    end

    if organization.update(permit_params)
      render json: organization
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: organizations
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: Organization.search(search)
    else
      render json: organizations
    end
  end

  private

  def organizations
    RegisteredMember.where('registered_members.user_id = :current_user_id', current_user_id: current_user[:id])
                    .all.map(&:organization)
  end

  def permit_params
    params.require(:organization).permit(
      :name,
      :description,
      :approve_status,
      :certificate_template
    )
  end
end
