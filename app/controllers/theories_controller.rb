class TheoriesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    theory = Theory.new(permit_params)
    theory.image.attach(io: File.open(permit_params[:image]), filename: 'file.jpg')
    if theory.save
      render json: theory
    else
      render json: { errors: theory.errors }, status: :unprocessable_entity
    end
  end

  def update
    theory = Theory.find(params[:id])
    if theory.update_attributes(permit_params)
      render json: theory
    else
      render json: { errors: theory.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Theory.find(params[:id]).destroy
  end

  def index
    render json: Theory.all
  end

  def show
    render json: Theory.find(params[:id])
  end

  private

  def permit_params
    params.require(Theory.name.underscore.to_sym).permit(
      :title,
      :content,
      :page_id,
      :image
    )
  end
end
