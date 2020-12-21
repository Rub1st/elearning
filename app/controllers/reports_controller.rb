class ReportsController < ApplicationController
  def create
    authorize!

    report = Reports::Create.call(permit_params)

    if report.save
      render json: Report.all
    else
      render json: { errors: report.errors }, status: :unprocessable_entity
    end
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
