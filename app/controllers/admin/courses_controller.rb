module Admin
  class CoursesController < ApplicationController
    def update
      authorize!
      course = Course.find(params[:id])
      if course.update(permit_params)
        render json: course
      else
        render json: { errors: course.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      authorize!
      Course.find(params[:id]).destroy
      render json: Course.all
    end

    def index
      authorize!
      render json: Course.all
    end

    def search
      render_search_data Course
    end

    private

    def permit_params
      params.require(:course).permit(
        :approve_status
      )
    end
  end
end