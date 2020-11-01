class UnregisteredMembersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    unregistered_member = UnregisteredMember.new(permit_params)
    if unregistered_member.save
      render json: unregistered_member
    else
      render json: { errors: unregistered_member.errors }, status: :unprocessable_entity
    end
  end

  def update
    unregistered_member = UnregisteredMember.find(params[:id])
    if unregistered_member.update_attributes(permit_params)
      render json: unregistered_member
    else
      render json: { errors: unregistered_member.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    UnregisteredMember.find(params[:id]).destroy
  end

  def index
    render json: UnregisteredMember.all
  end

  def show
    render json: UnregisteredMember.find(params[:id])
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
