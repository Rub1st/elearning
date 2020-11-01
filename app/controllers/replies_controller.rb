class RepliesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    reply = Reply.new(permit_params)
    if reply.save
      render json: reply
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def update
    reply = Reply.find(params[:id])
    if reply.update_attributes(permit_params)
      render json: reply
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Reply.find(params[:id]).destroy
  end

  def index
    render json: Reply.all
  end

  def show
    render json: Reply.find(params[:id])
  end

  private

  def permit_params
    params.require(Reply.name.underscore.to_sym).permit(
      :comment_id,
      :content,
      :author_id
    )
  end
end
