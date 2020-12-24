class CommentsController < ApplicationController
  def create
    authorize!
    comment = Comment.new(permit_params)

    render_created_data(comment, comments)
  end

  def destroy
    authorize!
    Comment.find(params[:id]).destroy

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
    Comment.where(course_id: params[:parent_id])
  end

  def permit_params
    params.require(:comment).permit(
      :course_id,
      :content,
      :author_id
    )
  end
end
