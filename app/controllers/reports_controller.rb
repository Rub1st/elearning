class ReportsController < ApplicationController
  def create
    new_report = Reports::Create.call(report_params)

    authorize! new_report.course.organization

    render_created_data(new_report, Report.all)
  end

  def index
    authorize!

    render json: Report.all
  end

  private

  def report_params
    params.require(:report).permit(
      :course_id
    )
  end
end
