class UserCoursesController < ApplicationController
  def create
    authorize!
    user_course = UserCourses::Create.call(permit_params)

    render_created_data(user_course, user_course)
  end

  def update
    user_course = UserCourse.find(params[:id])

    authorize! user_course

    UserCourses::Update.call(user_course, permit_params)
    user_course = UserCourse.find(params[:id])

    render_updated_data(user_course, permit_params, user_course)
  end

  def index
    authorize! user_courses

    render json: user_courses
  end

  def search
    render_search_data user_courses
  end

  def done_courses
    render json: UserCourse.where('user_id = ? and progress = 100', current_user[:id])
                           .all.offset(params[:current_page].to_i * 3).limit(3)
  end

  def current_courses
    render json: UserCourse.where('user_id = ? and progress <> 100', current_user[:id])
                           .all.offset(params[:current_page].to_i * 3).limit(3)
  end

  def favorite_courses
    render json: UserCourse.where(user_id: current_user[:id], is_favorite: true)
                           .all.offset(params[:current_page].to_i * 3).limit(3)
  end

  private

  def user_courses
    @user_courses ||= UserCourse.where(user_id: current_user[:id])
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
