class RepliesController < ApplicationController
  def create
    new_reply = Reply.new(reply_params)

    authorize! new_reply

    render_created_data(new_reply, comments)
  end

  def destroy
    authorize! reply

    reply.destroy

    render json: comments
  end

  private

  def reply
    @reply ||= Reply.find(params[:id])
  end

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
