module Admin
  class CoursesController < ApplicationController
    def update
      course = Course.find(params[:id])
      if course.update(permit_params)
        render json: course
      else
        render json: { errors: course.errors }, status: :unprocessable_entity
      end
    end

    def destroy
      Course.find(params[:id]).destroy
      render json: Course.all
    end

    def index
      render json: Course.all
    end

    def search
      search = params[:term] != '' ? params[:term] : nil
      if search
        render json: Course.search(search)
      else
        render json: Course.all
      end
    end

    private

    def permit_params
      params.require(:course).permit(
        :approve_status
      )
    end
  end
end