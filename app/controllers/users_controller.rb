class UsersController < ApplicationController
  def index
    authorize!

    render json: users
  end

  def update
    authorize!

    user = User.find(params[:id])

    p permit_params[:avatar]

    if permit_params[:avatar].present?
      user.avatar.purge
      user.avatar.attach(permit_params[:avatar])
    end

    if permit_params[:certificate_template].present?
      user.certificate_template.purge
      user.certificate_template.attach(permit_params[:certificate_template])
    end

    if user.update(login: permit_params[:login], full_name: permit_params[:full_name])
      render json: users
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: users.search(search)
    else
      render json: users
    end
  end

  private

  def users
    User.where(user_role: 1)
  end

  def permit_params
    params.require(:user).permit(
      :certificate_template,
      :avatar,
      :full_name,
      :login
    )
  end
end
