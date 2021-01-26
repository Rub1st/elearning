class OrganizationsController < ApplicationController
  def create
    authorize!

    render Organizations::Create.call(permit_params, current_user)
  end

  # rubocop:disable Metrics/AbcSize
  def update
    organization = Organization.find(params[:id])

    authorize! organization

    if permit_params[:certificate_template].present?
      organization.certificate_template.purge
      organization.certificate_template.attach(permit_params[:certificate_template])
    end

    updated = { name: permit_params[:name],
                description: permit_params[:description],
                approve_status: permit_params[:approve_status].to_i }

    render_updated_data(organization, updated, organization)
  end
  # rubocop:enable Metrics/AbcSize

  def index
    authorize!

    render json: organizations
  end

  def search
    render_search_data Organization
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
