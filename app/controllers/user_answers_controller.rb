class UserAnswersController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    ua = UserAnswer.new(permit_params)
    temp = Answer.all.select do |element|
      element.question[:id] == permit_params[:question_id] && element.value == ua.answer
    end
    p temp
    ua.is_correct = temp.count.positive?
    if ua.save
      ua = UserAnswer.find(ua.id)
      render json: ua, status: 201
    else
      render json: { errors: ua.errors }, status: :unprocessable_entity
    end
  end

  def update
    ua = UserAnswer.find(params[:id])

    if ua.update_attributes(permit_params)
      render json: ua, status: 201
    else
      render json: { errors: ua.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    UserAnswer.find(params[:id]).destroy
  end

  def index
    render json: UserAnswer.all, status: :ok
  end

  def show
    render json: UserAnswer.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(UserAnswer.name.underscore.to_sym).permit(
      :question_id,
      :answer,
      :user_id,
      :is_correct
    )
  end
end
