class CommentsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    comment = Comment.new(permit_params)
    if comment.save
      comment = Comment.find(comment.id)
      render json: comment, status: 201
    else
      render json: { errors: comment.errors }, status: :unprocessable_entity
    end
  end

  def update
    comment = Comment.find(params[:id])

    if comment.update_attributes(permit_params)
      render json: comment, status: 201
    else
      render json: { errors: comment.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Comment.find(params[:id]).destroy
  end

  def index
    render json: Comment.all, status: :ok
  end

  def show
    render json: Comment.find(params[:id]), status: :ok
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
