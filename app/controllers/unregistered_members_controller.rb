class UnregisteredMembersController < ApplicationController
  def create
    new_unregistered_member = UnregisteredMembers::Create.call(unregistered_member_params)

    authorize! new_unregistered_member.organization

    render_created_data(new_unregistered_member, unregistered_members)
  end

  def destroy
    authorize!
    unregistered_member.destroy

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

  def unregistered_member
    @unregistered_member ||= UnregisteredMember.find(params[:id])
  end

  def unregistered_members
    @unregistered_members ||= UnregisteredMember.where(organization_id: params[:parent_id])
  end

  def unregistered_member_params
    params.require(:unregistered_member).permit(
      :member_role,
      :organization_id,
      :email
    )
  end
end
