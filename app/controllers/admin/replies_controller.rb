module Admin
  class RepliesController < ApplicationController
    authorize!
    def destroy
      Reply.find(params[:id]).destroy
      render json: Comment.all
    end
  end
end
