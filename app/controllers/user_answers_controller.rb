class UserAnswersController < ApplicationController
  def create
    authorize!

    user_answer = UserAnswers::Create.call(permit_params)

    render_created_data(user_answer, user_answer)
  end

  private

  def permit_params
    params.require(:user_answer).permit(
      :question_id,
      :answer,
      :user_id,
      :is_correct
    )
  end
end
