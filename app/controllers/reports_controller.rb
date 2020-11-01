class ReportsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    report = Report.new(permit_params)
    if report.save
      render json: report
    else
      render json: { errors: report.errors }, status: :unprocessable_entity
    end
  end

  def update
    report = Report.find(params[:id])
    if report.update(permit_params)
      render json: report
    else
      render json: { errors: report.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Report.find(params[:id]).destroy
  end

  def index
    render json: Report.all
  end

  def show
    render json: Report.find(params[:id])
  end

  private

  def permit_params
    params.require(Report.name.underscore.to_sym).permit(
      :course_id,
      :percent_try,
      :count_try,
      :count_failed,
      :count_complete,
      :average_mark
    )
  end
end
