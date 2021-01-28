class CommentsController < ApplicationController
  def create
    new_comment = Comment.new(comment_params)

    authorize! new_comment

    render_created_data(new_comment, comments)
  end

  def destroy
    authorize! comment

    comment.destroy

    render json: comments
  end

  def index
    authorize!

    render json: comments
  end

  def search
    render_search_data Comment
  end

  private

  def comment
    @comment ||= Comment.find(params[:id])
  end

  def comments
    @comments ||= Comment.where(course_id: params[:parent_id])
  end

  def comment_params
    params.require(:comment).permit(
      :course_id,
      :content,
      :author_id
    )
  end
end
