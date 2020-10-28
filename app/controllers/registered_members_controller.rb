class RegisteredMembersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    rm = RegisteredMember.new(permit_params)
    if rm.save
      rm = RegisteredMember.find(rm.id)
      render json: rm, status: 201
    else
      render json: { errors: rm.errors }, status: :unprocessable_entity
    end
  end

  def update
    rm = RegisteredMember.find(params[:id])

    if rm.update_attributes(permit_params)
      render json: rm, status: 201
    else
      render json: { errors: rm.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    RegisteredMember.find(params[:id]).destroy
  end

  def index
    render json: RegisteredMember.all, status: :ok
  end

  def show
    render json: RegisteredMember.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(RegisteredMember.name.underscore.to_sym).permit(
      :member_role,
      :organization_id,
      :user_id
    )
  end
end
