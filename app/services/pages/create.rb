module Pages
  class Create
    include Service

    attr_accessor :params

    def initialize(params)
      @params = params
    end

    def call
      create_new_page
    end

    private

    def course_pages
      Page.where(course_id: params[:course_id])
    end

    def calculate_order
      course_pages.count.positive? ? course_pages.order(:order).last.order + 1 : 1
    end

    def create_new_page
      Page.new(
        course_id: params[:course_id],
        title: params[:title],
        order: calculate_order
      )
    end
  end
end
