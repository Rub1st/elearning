class CourseTagsController < ApplicationController
  def create
    course_tag = CourseTag.new(course_tag_params)

    render_created_data(course_tag, course_tag)
  end

  private

  def course_tag_params
    params.require(:course_tag).permit(
      :course_id,
      :tag_id
    )
  end
end
