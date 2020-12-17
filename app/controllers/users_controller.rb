class UsersController < ApplicationController
  def index
    render json: users
  end

  def update
    user = User.find(params[:id])

    if user.update(permit_params)
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
      :full_name,
      :login
    )
  end
end
