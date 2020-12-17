class UserAnswersController < ApplicationController
  def create
    ua = UserAnswer.new(permit_params)

    old_answers_killer

    if ua.save
      render json: ua
    else
      render json: { errors: ua.errors }, status: :unprocessable_entity
    end
  end

  private

  def old_answers_killer
    UserAnswer.where(user_id: permit_params[:user_id], question_id: permit_params[:question_id]).destroy_all
  end

  def permit_params
    params.require(:user_answer).permit(
      :question_id,
      :answer,
      :user_id,
      :is_correct
    )
  end
end
