class UserCoursesController < ApplicationController
  def create
    user_course = UserCourses::Create.call(permit_params)

    if user_course.save
      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def update
    user_course = UserCourse.find(params[:id])

    UserCourses::Update.call(user_course)

    user_course = UserCourse.find(params[:id])

    if user_course.update(permit_params)

      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: user_courses
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: user_courses.search(search)
    else
      render json: user_courses
    end
  end

  private

  def user_courses
    UserCourse.where(user_id: current_user[:id])
  end

  def permit_params
    params.require(:user_course).permit(
      :user_id,
      :course_id,
      :current_page,
      :is_favorite,
      :progress,
      :mark
    )
  end
end

