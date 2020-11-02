class UserCoursesController < ApplicationController

  def create
    user_course = UserCourse.new(permit_params)
    if user_course.save
      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def update
    user_course = UserCourse.find(params[:id])
    if user_course.update(permit_params)
      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: UserCourse.all
  end

  def show
    render json: UserCourse.find(params[:id])
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
