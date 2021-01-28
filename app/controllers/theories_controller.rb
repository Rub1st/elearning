class TheoriesController < ApplicationController
  def create
    new_theory = Theory.new(theory_params)

    authorize! new_theory

    if theory_params[:image].present?
      new_theory.image.attach(theory_params[:image])
    else
      new_theory.image.attach(io: File.open(Rails.root.join('app/assets/images/noimage.jpg')), filename: 'noiamge.jpg')
    end

    render_created_data(new_theory, new_theory)
  end

  def destroy
    authorize!
    theory.destroy

    render json: theories
  end

  def index
    authorize!
    render json: theories
  end

  private

  def theory
    @theory ||= Theory.find(params[:id])
  end

  def theories
    @theories ||= Theory.joins(:page).where('pages.course_id = :course_id', course_id: params[:parent_id])
  end

  def theory_params
    params.require(:theory).permit(
      :title,
      :content,
      :page_id,
      :image
    )
  end
end
