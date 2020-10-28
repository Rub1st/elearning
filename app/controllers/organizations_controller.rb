class OrganizationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    organization = Organization.new(permit_params)
    if organization.save
      o = Organization.find(organization.id)
      render json: o, status: 201
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def update
    organization = Organization.find(params[:id])

    if organization.update_attributes(permit_params)
      render json: organization, status: 201
    else
      render json: { errors: organization.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Organization.find(params[:id]).destroy
  end

  def index
    render json: Organization.all, status: :ok
  end

  def show
    render json: Organization.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Organization.name.underscore.to_sym).permit(
      :name,
      :description,
      :approve_status
    )
  end
end
