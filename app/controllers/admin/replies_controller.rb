module Admin
  class RepliesController < ApplicationController
    def destroy
      reply = Reply.find(params[:id])

      authorize! reply

      reply.destroy

      render json: Comment.all
    end
  end
end
