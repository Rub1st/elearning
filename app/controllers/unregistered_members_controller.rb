class UnregisteredMembersController < ApplicationController
  def create
    unregistered_member = UnregisteredMembers::Create.call(permit_params)

    authorize! unregistered_member.organization

    render_created_data(unregistered_member, unregistered_members)
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
