class ReportsController < ApplicationController
  def create
    report = Reports::Create.call(report_params)

    authorize! report.course.organization

    render_created_data(report, Report.all)
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
