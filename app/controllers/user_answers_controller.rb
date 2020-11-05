class UserAnswersController < ApplicationController

  def create
    ua = UserAnswer.new(permit_params)
    # temp = Answer.all.select do |element|
    #   element.question[:id] == permit_params[:question_id] && element.value == ua.answer
    # end
    # p temp
    # ua.is_correct = temp.count.positive?
    if ua.save
      render json: ua
    else
      render json: { errors: ua.errors }, status: :unprocessable_entity
    end
  end

  def update
    user_answer = UserAnswer.find(params[:id])
    if user_answer.update(permit_params)
      render json: user_answer
    else
      render json: { errors: user_answer.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: UserAnswer.all
  end

  def show
    render json: UserAnswer.find(params[:id])
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
