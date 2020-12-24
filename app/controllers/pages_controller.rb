class PagesController < ApplicationController
  def create
    authorize!
    page = Pages::Create.call(permit_params)

    render_created_data(page, page)
  end

  def update
    authorize!
    page = Page.find(params[:id])

    render_updated_data(page, permit_params, page)
  end

  def destroy
    authorize!
    Page.find(params[:id]).destroy

    render json: pages
  end

  def index
    authorize!

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
