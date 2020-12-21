class VariantsController < ApplicationController
  def create
    authorize!

    variant = Variant.new(permit_params)
    if variant.save
      render json: Question.find(variant.question.id)
    else
      render json: { errors: variant.errors }, status: :unprocessable_entity
    end
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
