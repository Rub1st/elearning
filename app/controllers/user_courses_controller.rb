class UserCoursesController < ApplicationController
  def create
    authorize!
    user_course = UserCourses::Create.call(permit_params)

    render_created_data(user_course, user_course)
  end

  def update
    authorize!
    user_course = UserCourse.find(params[:id])
    UserCourses::Update.call(user_course, permit_params)
    user_course = UserCourse.find(params[:id])

    render_updated_data(user_course, permit_params, user_course)
  end

  def index
    authorize!

    render json: user_courses
  end

  def search
    render_search_data user_courses
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

