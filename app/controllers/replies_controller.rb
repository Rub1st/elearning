class RepliesController < ApplicationController
  def create
    authorize!
    reply = Reply.new(permit_params)
    if reply.save
      render json: comments
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    authorize!
    Reply.find(params[:id]).destroy
    render json: comments
  end

  private

  def comments
    Comment.where(course_id: params[:parent_id])
  end

  def permit_params
    params.require(:reply).permit(
      :comment_id,
      :content,
      :author_id
    )
  end
end
