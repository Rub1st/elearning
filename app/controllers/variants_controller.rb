class VariantsController < ApplicationController
  def create
    authorize!
    variant = Variant.new(permit_params)

    render_created_data(variant, Question.find(variant.question.id))
  end

  def destroy
    authorize!

    Variant.find(params[:id]).destroy
  end

  private

  def permit_params
    params.require(:variant).permit(
      :order,
      :question_id,
      :value,
      :is_correct
    )
  end
end
