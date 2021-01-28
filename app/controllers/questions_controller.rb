class QuestionsController < ApplicationController
  def create
    new_question = Question.new(question_params)

    authorize! new_question

    render_created_data(new_question, new_question)
  end

  def destroy
    authorize!
    question.destroy

    render json: questions
  end

  def index
    authorize!
    render json: questions
  end

  private

  def question
    @question ||= Question.find(params[:id])
  end

  def questions
    @questions ||= Question.joins(:page).where('pages.course_id = :course_id', course_id: params[:parent_id])
  end

  def question_params
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
