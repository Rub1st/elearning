class UserAnswersController < ApplicationController
  def create
    new_user_answer = UserAnswers::Create.call(user_answer_params)

    authorize! new_user_answer

    render_created_data(new_user_answer, new_user_answer)
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
