class UnregisteredMembersController < ApplicationController
  def create
    authorize!
    unregistered_member = UnregisteredMembers::Create.call(permit_params)
    if unregistered_member.save
      render json: unregistered_members
    else
      render json: { errors: unregistered_member.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize!
    UnregisteredMember.find(params[:id]).destroy
    render json: unregistered_members
  end

  def index
    authorize!
    render json: unregistered_members
  end

  def search
    render_search_data unregistered_members
  end

  private

  def unregistered_members
    UnregisteredMember.where(organization_id: params[:parent_id])
  end

  def permit_params
    params.require(:unregistered_member).permit(
      :member_role,
      :organization_id,
      :email
    )
  end
end
