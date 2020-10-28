class RepliesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    reply = Reply.new(permit_params)
    if reply.save
      reply = Reply.find(reply.id)
      render json: reply, status: 201
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def update
    reply = Reply.find(params[:id])

    if reply.update_attributes(permit_params)
      render json: reply, status: 201
    else
      render json: { errors: reply.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Reply.find(params[:id]).destroy
  end

  def index
    render json: Reply.all, status: :ok
  end

  def show
    render json: Reply.find(params[:id]), status: :ok
  end

  private

  def permit_params
    params.require(Reply.name.underscore.to_sym).permit(
      :comment_id,
      :content,
      :author_id
    )
  end
end
