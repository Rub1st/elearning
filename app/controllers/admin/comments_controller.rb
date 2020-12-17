module Admin
  class CommentsController < ApplicationController
    def destroy
      Comment.find(params[:id]).destroy
      render json: Comment.all
    end

    def index
      render json: Comment.all
    end

    def search
      search = params[:term] != '' ? params[:term] : nil
      if search
        render json: Comment.search(search)
      else
        render json: Comment.all
      end
    end
  end
end
