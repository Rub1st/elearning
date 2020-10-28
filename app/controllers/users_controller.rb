class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.new(permit_params)
    user.avatar.attach(io: File.open(permit_params[:avatar]), filename: 'file.jp')
    if user.save
      u = User.find(user.id)
      render json: u, status: 201
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])

    if user.update_attributes(permit_params)
      render json: user, status: 201
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    User.find(params[:id]).destroy
  end

  def index
    render json: User.all, status: :ok
  end

  def show
    render json: User.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(User.name.underscore.to_sym).permit(
      :login,
      :email,
      :full_name,
      :birthday,
      :user_role,
      :password,
      :avatar
    )
  end
end
