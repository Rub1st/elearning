class TheoriesController < ApplicationController
  def create
    theory = Theory.new(permit_params)

    if permit_params[:image].present?
      theory.image.attach(permit_params[:image])
    else
      theory.image.attach(io: File.open('/home/akira/Desktop/noimage.jpg'), filename: 'noiamge.jpg')
    end

    if theory.save
      render json: theory
    else
      render json: { errors: theory.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Theory.find(params[:id]).destroy
    render json: theories
  end

  def index
    render json: theories
  end

  private

  def theories
    Theory.joins(:page).where('pages.course_id = :course_id', course_id: params[:parent_id])
  end

  def permit_params
    params.require(:theory).permit(
      :title,
      :content,
      :page_id,
      :image
    )
  end
end
