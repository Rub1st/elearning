class CoursesController < ApplicationController
  def create
    authorize!
    course = Course.new(permit_params)

    if permit_params[:image].present?
      course.image.attach(permit_params[:image])
    else
      course.image.attach(io: File.open('/home/akira/Desktop/noimage.jpg'), filename: 'noiamge.jpg')
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
    render_search_data Course
  end

  private

  def courses
    (public_courses + private_courses + individual_courses).map { |item| Course.find(item.id)}
  end

  def public_courses
    Course.where(access_type: 0)
  end

  def private_courses
    Course.where(access_type: 1).select do |course|
      RegisteredMember.where('organization_id = :organization_id and user_id = :current_user_id',
                             organization_id: course.organization.id,
                             current_user_id: current_user[:id]).count > 0
    end
  end

  def individual_courses
    CourseMember.joins(:course)
                .where('course_members.user_id = :current_user_id', current_user_id: current_user[:id])
                .map(&:course)
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
