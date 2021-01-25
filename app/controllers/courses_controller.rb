class CoursesController < ApplicationController
  def create
    authorize!
    course = Course.new(permit_params)

    if permit_params[:image].present?
      course.image.attach(permit_params[:image])
    else
      course.image.attach(io: File.open(Rails.root.join('/app/assets/images/noimage.jpg')), filename: 'noimage.jpg')
    end

    render_created_data(course, course)
  end

  def update
    authorize!
    course = Course.find(params[:id])

    render_updated_data(course, permit_params, course)
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
    Course.all.offset(params[:current_page].to_i * 4).limit(4)
  end

  def permit_params
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
