class CourseTagsController < ApplicationController

  def create
    course_tag = CourseTag.new(permit_params)
    if course_tag.save
      render json: course_tag
    else
      render json: { errors: course_tag.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    CourseTag.find(params[:id]).destroy
  end

  def index
    render json: CourseTag.all
  end

  private

  def permit_params
    params.require(:course_tag).permit(
      :course_id,
      :tag_id
    )
  end

end
