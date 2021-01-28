class CoursesController < ApplicationController
  def create
    authorize!
    course = Course.new(course_params)

    if course_params[:image].present?
      course.image.attach(course_params[:image])
    else
      course.image.attach(io: File.open(Rails.root.join('app/assets/images/noimage.jpg')), filename: 'noimage.jpg')
    end

    render_created_data(course, course)
  end

  def update
    course = Course.find(params[:id])

    authorize! course

    render_updated_data(course, course_params, course)
  end

  def index
    authorize!
    render json: courses
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: courses.search(search)
    else
      render json: courses.all
    end
  end

  def my_courses
    render json: Course.where(author_id: current_user[:id]).offset(params[:current_page].to_i * 3).limit(3)
  end

  def recommended_courses
    render json: Course.where('author_id <> ?', current_user[:id]).offset(params[:current_page].to_i * 3).limit(3)
  end

  private

  def courses
    @courses ||= Course.where(access_type: 0).offset(params[:current_page].to_i * 4).limit(4)
  end

  def course_params
    params.require(:course).permit(
      :label,
      :mark,
      :why_content,
      :will_content,
      :access_type,
      :approve_status,
      :organization_id,
      :course_status,
      :author_id,
      :image
    )
  end
end
