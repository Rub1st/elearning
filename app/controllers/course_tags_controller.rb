class CourseTagsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    ct = CourseTag.new(permit_params)
    if ct.save
      ct = CourseTag.find(ct.id)
      render json: ct, status: 201
    else
      render json: { errors: ct.errors }, status: :unprocessable_entity
    end
  end

  def update
    ct = CourseTag.find(params[:id])

    if ct.update_attributes(permit_params)
      render json: ct, status: 201
    else
      render json: { errors: ct.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    CourseTag.find(params[:id]).destroy
  end

  def index
    render json: CourseTag.all, status: :ok
  end

  def show
    render json: CourseTag.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(CourseTag.name.underscore.to_sym).permit(
      :course_id,
      :tag_id
    )
  end

end
