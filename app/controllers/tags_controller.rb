class TagsController < ApplicationController
  def index
    render json: Tag.all
  end

  def search
    search = params[:term] != '' ? params[:term] : nil
    if search
      render json: Tag.search(search)
    else
      render json: Tag.all
    end
  end
end
