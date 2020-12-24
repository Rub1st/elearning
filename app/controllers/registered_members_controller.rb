class RegisteredMembersController < ApplicationController
  def create
    authorize!
    registered_member = RegisteredMember.new(permit_params)

    render_created_data(registered_member, RegisteredMember)
  end

  def destroy
    authorize!
    RegisteredMember.find(params[:id]).destroy

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

  def registered_members
    RegisteredMember.where(organization_id: params[:parent_id])
  end

  def permit_params
    params.require(:registered_member).permit(
      :member_role,
      :organization_id,
      :user_id
    )
  end
end
