module Admin
  class OrganizationsController < ApplicationController
    def update
      authorize!
      organization = Organization.find(params[:id])

      if permit_params[:certificate_template].present?
        organization.certificate_template.purge
        organization.certificate_template.attach(permit_params[:certificate_template])
      end

      render_updated_data(organization, permit_params, organization)
    end

    def destroy
      authorize!
      Organization.find(params[:id]).destroy
      render json: Organization.all
    end

    def index
      authorize!
      render json: Organization.all
    end

    def search
      render_search_data Organization
    end

    private

    def permit_params
      params.require(:organization).permit(
        :approve_status
      )
    end
  end
end
