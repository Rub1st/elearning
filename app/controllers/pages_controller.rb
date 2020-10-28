class PagesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    page = Page.new(permit_params)
    if page.save
      page = Page.find(page.id)
      render json: page, status: 201
    else
      render json: { errors: page.errors }, status: :unprocessable_entity
    end
  end

  def update
    page = Page.find(params[:id])

    if page.update_attributes(permit_params)
      render json: page, status: 201
    else
      render json: { errors: page.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    Page.find(params[:id]).destroy
  end

  def index
    render json: Page.all, status: :ok
  end

  def show
    render json: Page.find(params[:id]), status: :ok
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
