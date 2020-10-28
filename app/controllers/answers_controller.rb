class AnswersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    answer = Answer.new(permit_params)
    if answer.save
      answer = Answer.find(answer.id)
      render json: answer, status: 201
    else
      render json: { errors: answer.errors }, status: :unprocessable_entity
    end
  end

  def update
    answer = Answer.find(params[:id])

    if answer.update_attributes(permit_params)
      render json: answer, status: 201
    else
      render json: { errors: answer.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Answer.find(params[:id]).destroy
  end

  def index
    render json: Answer.all, status: :ok
  end

  def show
    render json: Answer.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Answer.name.underscore.to_sym).permit(
      :question_id,
      :value,
      :order
    )
  end
end
