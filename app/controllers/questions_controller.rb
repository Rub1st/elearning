class QuestionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    question = Question.new(permit_params)
    if question.save
      question = Question.find(question.id)
      render json: question, status: 201
    else
      render json: { errors: question.errors }, status: :unprocessable_entity
    end
  end

  def update
    question = Question.find(params[:id])

    if question.update_attributes(permit_params)
      render json: question, status: 201
    else
      render json: { errors: question.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Question.find(params[:id]).destroy
  end

  def index
    render json: Question.all, status: :ok
  end

  def show
    render json: Question.find(params[:id]), status: :ok
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
