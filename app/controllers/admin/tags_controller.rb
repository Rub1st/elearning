module Admin
  class TagsController < ApplicationController
    def create
      authorize!
      tag = Tag.new(permit_params)

      render_created_data(tag, Tag)
    end

    def update
      authorize!
      tag = Tag.find(params[:id])

      render_updated_data(tag, permit_params, Tag)
    end

    def index
      render json: Tag.all
    end

    def search
      render_search_data Tag
    end

    private

    def permit_params
      params.require(:tag).permit(
        :name
      )
    end
  end
end
