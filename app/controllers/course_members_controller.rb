class CourseMembersController < ApplicationController
  def create
    new_course_member = CourseMember.new(course_member_params)

    render_created_data(new_course_member, new_course_member)
  end

  private

  def course_member_params
    params.require(:course_member).permit(
      :course_id,
      :user_id
    )
  end
end
