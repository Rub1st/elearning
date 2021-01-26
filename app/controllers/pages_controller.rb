class PagesController < ApplicationController
  def create
    page = Pages::Create.call(permit_params)

    authorize! Course.find(page.course_id)

    render_created_data(page, page)
  end

  def update
    page = Page.find(params[:id])

    authorize! Course.find(page.course_id)

    render_updated_data(page, permit_params, page)
  end

  def destroy
    page = Page.find(params[:id])

    authorize!

    page.destroy

    render json: pages
  end

  def index
    authorize!

    render json: pages
  end

  private

  def pages
    @pages ||= Page.where(course_id: params[:parent_id])
  end

  def permit_params
    params.require(:page).permit(
      :course_id,
      :title
    )
  end
end
