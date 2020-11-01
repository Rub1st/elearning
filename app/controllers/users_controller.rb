class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.new(permit_params)
    user.avatar.attach(io: File.open(permit_params[:avatar]), filename: 'file.jpg')
    user.certificate_template.attach(io: File.open(permit_params[:certificate_template]), filename: 'file.pdf')
    if user.save
      render json: user
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(permit_params)
      render json: user
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    User.find(params[:id]).destroy
  end

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
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
      :avatar,
      :certificate_template
    )
  end
end
