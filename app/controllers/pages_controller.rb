class PagesController < ApplicationController

  def create
    page = Page.new(permit_params)
    if page.save
      render json: page
    else
      render json: { errors: page.errors }, status: :unprocessable_entity
    end
  end

  def update
    page = Page.find(params[:id])
    if page.update(permit_params)
      render json: page
    else
      render json: { errors: page.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Page.find(params[:id]).destroy
  end

  def index
    render json: Page.all
  end

  def show
    render json: Page.find(params[:id])
  end

  private

  def permit_params
    params.require(Page.name.underscore.to_sym).permit(
      :course_id,
      :order,
      :title
    )
  end
end
