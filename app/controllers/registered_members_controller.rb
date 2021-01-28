class RegisteredMembersController < ApplicationController
  def create
    new_registered_member = RegisteredMember.new(registered_member_params)

    authorize! new_registered_member.organization

    render_created_data(new_registered_member, registered_members)
  end

  def destroy
    authorize!

    registered_member.destroy

    render json: registered_members
  end

  def index
    authorize!

    render json: registered_members
  end

  def search
    render_search_data registered_members
  end

  private

  def registered_member
    @registered_member ||= RegisteredMember.find(params[:id])
  end

  def registered_members
    @registered_members ||= RegisteredMember.where(organization_id: params[:parent_id])
  end

  def registered_member_params
    params.require(:registered_member).permit(
      :member_role,
      :organization_id,
      :user_id
    )
  end
end
