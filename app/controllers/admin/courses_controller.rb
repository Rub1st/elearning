module Admin
  class CoursesController < ApplicationController
    def update
      authorize!
      course = Course.find(params[:id])

      render_updated_data(course, permit_params, course)
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
