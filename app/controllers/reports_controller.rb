class ReportsController < ApplicationController
  def create
    report = Reports::Create.call(permit_params)

    authorize! report.course.organization

    render_created_data(report, Report.all)
  end

  def index
    authorize!

    render json: Report.all
  end

  private

  def permit_params
    params.require(:report).permit(
      :course_id
    )
  end
end
