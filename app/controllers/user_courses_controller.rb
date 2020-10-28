class UserCoursesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    uc = UserCourse.new(permit_params)
    if uc.save
      uc = UserCourse.find(uc.id)
      render json: uc, status: 201
    else
      render json: { errors: uc.errors }, status: :unprocessable_entity
    end
  end

  def update
    uc = UserCourse.find(params[:id])

    if uc.update_attributes(permit_params)
      render json: uc, status: 201
    else
      render json: { errors: uc.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    UserCourse.find(params[:id]).destroy
  end

  def index
    render json: UserCourse.all, status: :ok
  end

  def show
    render json: UserCourse.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(UserCourse.name.underscore.to_sym).permit(
      :user_id,
      :course_id,
      :current_page,
      :is_favorite,
      :progress,
      :correct,
      :mark
    )
  end
end
