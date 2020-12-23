module Admin
  class CommentsController < ApplicationController
    def destroy
      authorize!
      Comment.find(params[:id]).destroy
      render json: Comment.all
    end

    def index
      authorize!
      render json: Comment.all
    end

    def search
      render_search_data Comment
    end
  end
end
