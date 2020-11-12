class RegisteredMembersController < ApplicationController

  def create
    registered_member = RegisteredMember.new(permit_params)
    if registered_member.save
      render json: RegisteredMember.all
    else
      render json: { errors: registered_member.errors }, status: :unprocessable_entity
    end
  end

  def update
    registered_member = RegisteredMember.find(params[:id])
    if registered_member.update(permit_params)
      render json: registered_member
    else
      render json: { errors: rm.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    RegisteredMember.find(params[:id]).destroy
    render json: RegisteredMember.all
  end

  def index
    render json: RegisteredMember.all
  end

  def show
    render json: RegisteredMember.find(params[:id])
  end

  private

  def permit_params
    params.require(:registered_member).permit(
      :member_role,
      :organization_id,
      :user_id
    )
  end
end
