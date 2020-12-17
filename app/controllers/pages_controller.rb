class PagesController < ApplicationController
  def create
    page = Pages::Create.call(permit_params)
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
    render json: pages
  end

  def index
    render json: pages
  end

  private

  def pages
    Page.where(course_id: params[:parent_id])
  end

  def permit_params
    params.require(:page).permit(
      :course_id,
      :title
    )
  end
end
