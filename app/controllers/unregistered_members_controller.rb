class UnregisteredMembersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    um = UnregisteredMember.new(permit_params)
    if um.save
      um = UnregisteredMember.find(um.id)
      render json: um, status: 201
    else
      render json: { errors: um.errors }, status: :unprocessable_entity
    end
  end

  def update
    um = UnregisteredMember.find(params[:id])

    if um.update_attributes(permit_params)
      render json: um, status: 201
    else
      render json: { errors: um.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    UnregisteredMember.find(params[:id]).destroy
  end

  def index
    render json: UnregisteredMember.all, status: :ok
  end

  def show
    render json: UnregisteredMember.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(UnregisteredMember.name.underscore.to_sym).permit(
      :member_role,
      :organization_id,
      :code,
      :email
    )
  end
end
