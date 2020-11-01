class TagsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    tag = Tag.new(permit_params)
    if tag.save
      render json: tag
    else
      render json: { errors: tag.errors }, status: :unprocessable_entity
    end
  end

  def update
    tag = Tag.find(params[:id])

    if tag.update(permit_params)
      render json: tag
    else
      render json: { errors: tag.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Tag.find(params[:id]).destroy
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
