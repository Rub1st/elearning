class CommentsController < ApplicationController
  def create
    authorize!
    comment = Comment.new(permit_params)
    if comment.save
      render json: comments
    else
      render json: { errors: comment.errors }, status: :unprocessable_entity
    end
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
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: Comment.search(search)
    else
      render json: Comment.all
    end
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
