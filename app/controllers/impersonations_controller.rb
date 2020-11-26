class ImpersonationsController < ApplicationController

  def create
    imperson = Impersonation.new(permit_params)
    if imperson.save
      render json: imperson
    else
      render json: { errors: imperson.errors }, status: :unprocessable_entity
    end
  end

  def update
    imperson = Impersonation.find(params[:id])
    if imperson.update(permit_params)
      render json: Impersonation.all
    else
      render json: { errors: imperson.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: Impersonation.all
  end

  def show
    render json: Impersonation.find(params[:id])
  end

  private

  def permit_params
    params.require(:impersonation).permit(
      :start,
      :end,
      :manager_id,
      :common_id,
      :organization_id
    )
  end
end
