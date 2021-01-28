class PagesController < ApplicationController
  def create
    new_page = Pages::Create.call(page_params)

    authorize! Course.find(new_page.course_id)

    render_created_data(new_page, new_page)
  end

  def update
    authorize! Course.find(page.course_id)

    render_updated_data(page, page_params, page)
  end

  def destroy
    authorize!

    page.destroy

    render json: pages
  end

  def index
    authorize!

    render json: pages
  end

  private

  def page
    @page ||= Page.find(params[:id])
  end

  def pages
    @pages ||= Page.where(course_id: params[:parent_id])
  end

  def page_params
    params.require(:page).permit(
      :course_id,
      :title
    )
  end
end
