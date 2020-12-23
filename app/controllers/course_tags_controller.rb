class CourseTagsController < ApplicationController
  def create
    course_tag = CourseTag.new(permit_params)

    render_data(course_tag.save, course_tag)
  end

  private

  def permit_params
    params.require(:course_tag).permit(
      :course_id,
      :tag_id
    )
  end
end
