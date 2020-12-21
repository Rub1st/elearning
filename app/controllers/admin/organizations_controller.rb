module Admin
  class OrganizationsController < ApplicationController
    def update
      authorize!
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
      search = params[:term] != '' ? params[:term] : nil
      if search
        render json: Organization.search(search)
      else
        render json: Organization.all
      end
    end

    private

    def permit_params
      params.require(:organization).permit(
        :approve_status,
      )
    end
  end
end