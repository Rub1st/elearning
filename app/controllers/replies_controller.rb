class RepliesController < ApplicationController
  def create
    reply = Reply.new(reply_params)

    authorize! reply

    render_created_data(reply, comments)
  end

  def destroy
    reply = Reply.find(params[:id])

    authorize! reply

    reply.destroy

    render json: comments
  end

  private

  def comments
    @comments ||= Comment.where(course_id: params[:parent_id])
  end

  def reply_params
    params.require(:reply).permit(
      :comment_id,
      :content,
      :author_id
    )
  end
end
