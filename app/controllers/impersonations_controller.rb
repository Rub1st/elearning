class ImpersonationsController < ApplicationController

  def create
    imperson = Impersonation.new(permit_params)
    if imperson.save
      render json: imperson
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
      :common_id
    )
  end
end
