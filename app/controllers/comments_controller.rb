class CommentsController < ApplicationController

  def create
    comment = Comment.new(permit_params)
    if comment.save
      render json: comment
    else
      render json: { errors: comment.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Comment.find(params[:id]).destroy
  end

  def index
    render json: Comment.all
  end

  private

  def permit_params
    params.require(Comment.name.underscore.to_sym).permit(
      :course_id,
      :content,
      :author_id
    )
  end
end
