class ReportsController < ApplicationController
  def create
    authorize!
    report = Reports::Create.call(permit_params)

    render_created_data(report, Report)
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
