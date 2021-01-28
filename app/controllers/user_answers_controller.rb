class UserAnswersController < ApplicationController
  def create
    user_answer = UserAnswers::Create.call(user_answer_params)

    authorize! user_answer

    render_created_data(user_answer, user_answer)
  end

  private

  def user_answer_params
    params.require(:user_answer).permit(
      :question_id,
      :answer,
      :user_id,
      :is_correct
    )
  end
end
