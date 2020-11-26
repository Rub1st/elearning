class RepliesController < ApplicationController

  def create
    reply = Reply.new(permit_params)
    if reply.save
      render json: Comment.all
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Reply.find(params[:id]).destroy
    render json: Comment.all
  end

  def index
    render json: Reply.all
  end

  private

  def permit_params
    params.require(:reply).permit(
      :comment_id,
      :content,
      :author_id
    )
  end
end
