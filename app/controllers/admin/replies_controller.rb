module Admin
  class RepliesController < ApplicationController
    def destroy
      authorize!
      Reply.find(params[:id]).destroy
      render json: Comment.all
    end
  end
end
