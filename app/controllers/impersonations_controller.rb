class ImpersonationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    imperson = Impersonation.new(permit_params)
    if imperson.save
      imperson = Impersonation.find(imperson.id)
      render json: imperson, status: 201
    else
      render json: { errors: imperson.errors }, status: :unprocessable_entity
    end
  end

  def update
    imperson = Impersonation.find(params[:id])

    if imperson.update_attributes(permit_params)
      render json: imperson, status: 201
    else
      render json: { errors: imperson.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Impersonation.find(params[:id]).destroy
  end

  def index
    render json: Impersonation.all, status: :ok
  end

  def show
    render json: Impersonation.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Impersonation.name.underscore.to_sym).permit(
      :start,
      :end,
      :manager_id,
      :common_id
    )
  end
end
