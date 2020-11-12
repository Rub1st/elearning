class TheoriesController < ApplicationController

  def create
    theory = Theory.new(permit_params)
    theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: 'file.jpg')
    if theory.save
      render json: theory
    else
      render json: { errors: theory.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Theory.find(params[:id]).destroy
    render json: Theory.all
  end

  def index
    render json: Theory.all
  end

  def show
    render json: Theory.find(params[:id])
  end

  private

  def permit_params
    params.require(:theory).permit(
      :title,
      :content,
      :page_id,
      :image
    )
  end
end
