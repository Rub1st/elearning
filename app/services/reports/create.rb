module Reports
  class Create
    include Service

    attr_accessor :params

    def initialize(params)
      @params = params
    end

    def call
      destroy_old_reports
      build_new_report
    end

    private

    def destroy_old_reports
      Report.where(course_id: params[:course_id]).destroy_all
    end

    def user_courses
      @user_courses ||= UserCourse.where(course_id: params[:course_id])
    end

    def finished_user_courses
      @finished_user_courses ||= user_courses.where(progress: 100)
    end

    def count_failed
      finished_user_courses.where(correct: (0..90)).count
    end

    def count_complete
      finished_user_courses.where(correct: (91..100)).count
    end

    def user_courses_with_mark
      @user_courses_with_mark ||= finished_user_courses.where.not(mark: nil)
    end

    def average_mark
      user_courses_with_mark.sum(:mark).to_f / user_courses_with_mark.count
    end

    def build_new_report
      Report.new(
        course_id: params[:course_id],
        count_try: user_courses.count,
        count_failed: count_failed,
        count_complete: count_complete,
        average_mark: average_mark
      )
    end
  end
end
