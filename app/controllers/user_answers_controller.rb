class UserAnswersController < ApplicationController
  def create
    authorize!

    ua = UserAnswers::Create.call(permit_params)

    render_created_data(ua, ua)
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
