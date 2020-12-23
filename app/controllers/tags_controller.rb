class TagsController < ApplicationController
  def index
    render json: Tag.all
  end

  def search
    render_search_data Tag
  end
end
