class QuestionsController < ApplicationController
  def create
    authorize!

    question = Question.new(permit_params)
    if question.save
      render json: question
    else
      render json: { errors: question.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize!

    Question.find(params[:id]).destroy
    render json: questions
  end

  def index
    authorize!

    render json: questions
  end

  private

  def questions
    Question.joins(:page).where('pages.course_id = :course_id', course_id: params[:parent_id])
  end

  def permit_params
    params.require(:question).permit(
      :page_id,
      :question_type,
      :title,
      :description,
      :question_text,
      :difficult
    )
  end
end
