class CommentsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    comment = Comment.new(permit_params)
    if comment.save
      render json: comment
    else
      render json: { errors: comment.errors }, status: :unprocessable_entity
    end
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(permit_params)
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

  def show
    render json: Comment.find(params[:id])
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
