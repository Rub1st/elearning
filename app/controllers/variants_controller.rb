class VariantsController < ApplicationController
  def create
    new_variant = Variant.new(variant_params)

    authorize! new_variant

    render_created_data(new_variant, Question.find(new_variant.question.id))
  end

  def destroy
    authorize! variant

    variant.destroy
  end

  private

  def variant
    @variant ||= Variant.find(params[:id])
  end

  def variant_params
    params.require(:variant).permit(
      :order,
      :question_id,
      :value,
      :is_correct
    )
  end
end
