class QuestionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    question = Question.new(permit_params)
    if question.save
      render json: question
    else
      render json: { errors: question.errors }, status: :unprocessable_entity
    end
  end

  def update
    question = Question.find(params[:id])
    if question.update_attributes(permit_params)
      render json: question
    else
      render json: { errors: question.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Question.find(params[:id]).destroy
  end

  def index
    render json: Question.all
  end

  def show
    render json: Question.find(params[:id])
  end

  private

  def permit_params
    params.require(Question.name.underscore.to_sym).permit(
      :page_id,
      :question_type,
      :title,
      :description,
      :question_text,
      :difficult
    )
  end
end
