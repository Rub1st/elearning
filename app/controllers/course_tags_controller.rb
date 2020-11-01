class CourseTagsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    course_tag = CourseTag.new(permit_params)
    if course_tag.save
      render json: course_tag
    else
      render json: { errors: course_tag.errors }, status: :unprocessable_entity
    end
  end

  def update
    course_tag = CourseTag.find(params[:id])
    if ct.update(permit_params)
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

  def show
    render json: CourseTag.find(params[:id])
  end

  private

  def permit_params
    params.require(CourseTag.name.underscore.to_sym).permit(
      :course_id,
      :tag_id
    )
  end

end
