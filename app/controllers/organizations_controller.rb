class OrganizationsController < ApplicationController
  def create
    authorize!

    render Organizations::Create.call(organization_params, current_user)
  end

  # rubocop:disable Metrics/AbcSize
  def update
    authorize! organization

    if organization_params[:certificate_template].present?
      organization.certificate_template.purge
      organization.certificate_template.attach(organization_params[:certificate_template])
    end

    updated = { name: organization_params[:name],
                description: organization_params[:description],
                approve_status: organization_params[:approve_status].to_i }

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

  def organization
    @organization ||= Organization.find(params[:id])
  end

  def organizations
    RegisteredMember.where('registered_members.user_id = :current_user_id', current_user_id: current_user[:id])
                    .all.map(&:organization)
  end

  def organization_params
    params.require(:organization).permit(
      :name,
      :description,
      :approve_status,
      :certificate_template
    )
  end
end
