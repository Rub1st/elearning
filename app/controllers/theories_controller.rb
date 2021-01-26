class TheoriesController < ApplicationController
  def create
    theory = Theory.new(permit_params)

    authorize! theory

    if permit_params[:image].present?
      theory.image.attach(permit_params[:image])
    else
      theory.image.attach(io: File.open(Rails.root.join('app/assets/images/noimage.jpg')), filename: 'noiamge.jpg')
    end

    render_created_data(theory, theory)
  end

  def destroy
    authorize!
    Theory.find(params[:id]).destroy

    render json: theories
  end

  def index
    authorize!
    render json: theories
  end

  private

  def theories
    @theories ||= Theory.joins(:page).where('pages.course_id = :course_id', course_id: params[:parent_id])
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
