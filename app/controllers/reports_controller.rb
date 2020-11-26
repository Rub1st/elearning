class ReportsController < ApplicationController
  def create
    report = report_generator(params[:course_id])

    old_reports_killer

    if report.save
      render json: Report.all
    else
      render json: { errors: report.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: Report.all
  end

  def show
    render json: Report.find(params[:id])
  end

  private

  def old_reports_killer
    Report.select { |item| item.course.id == params[:course_id] }.each(&:destroy)
  end

  def report_generator(course_id)
    user_courses = UserCourse.select { |item| item.course.id == course_id }
    finished_user_courses = user_courses.select { |item| item.progress == 100 }
    user_courses_with_mark = finished_user_courses.reject { |item| item.mark.nil? }
    Report.new(
      course_id: course_id,
      count_try: user_courses.count,
      count_failed: finished_user_courses.select { |item| item.correct <= 90 }.count,
      count_complete: finished_user_courses.select { |item| item.correct > 90 }.count,
      average_mark: user_courses_with_mark.sum(&:mark).to_f / user_courses_with_mark.count
    )
  end

  def permit_params
    params.require(:report).permit(
      :course_id
    )
  end
end
