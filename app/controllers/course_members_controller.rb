class CourseMembersController < ApplicationController
  def create
    course_member = CourseMember.new(permit_params)
    if course_member.save
      render json: course_member
    else
      render json: { errors: course_member.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: CourseMember.all
  end

  private

  def permit_params
    params.require(:course_member).permit(
      :course_id,
      :user_id
    )
  end
end
