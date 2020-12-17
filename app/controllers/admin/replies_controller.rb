module Admin
  class RepliesController < ApplicationController
    def destroy
      Reply.find(params[:id]).destroy
      render json: Comment.all
    end
  end
end
