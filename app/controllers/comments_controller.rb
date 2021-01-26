class CommentsController < ApplicationController
  def create
    comment = Comment.new(permit_params)

    authorize! comment

    render_created_data(comment, comments)
  end

  def destroy
    comment = Comment.find(params[:id])

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

  def comments
    @comments ||= Comment.where(course_id: params[:parent_id])
  end

  def permit_params
    params.require(:comment).permit(
      :course_id,
      :content,
      :author_id
    )
  end
end
