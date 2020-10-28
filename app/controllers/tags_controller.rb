class TagsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    tag = Tag.new(permit_params)
    if tag.save
      tag = Tag.find(tag.id)
      render json: tag, status: 201
    else
      render json: { errors: tag.errors }, status: :unprocessable_entity
    end
  end

  def update
    tag = Tag.find(params[:id])

    if tag.update_attributes(permit_params)
      render json: tag, status: 201
    else
      render json: { errors: tag.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Tag.find(params[:id]).destroy
  end

  def index
    render json: Tag.all, status: :ok
  end

  def show
    render json: Tag.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Tag.name.underscore.to_sym).permit(
      :name
    )
  end
end
