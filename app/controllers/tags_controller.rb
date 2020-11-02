class TagsController < ApplicationController

  def create
    tag = Tag.new(permit_params)
    if tag.save
      render json: tag
    else
      render json: { errors: tag.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: Tag.all
  end

  def show
    render json: Tag.find(params[:id])
  end

  private

  def permit_params
    params.require(Tag.name.underscore.to_sym).permit(
      :name
    )
  end
end
