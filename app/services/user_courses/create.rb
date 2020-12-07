module UserCourses
  class Create
    include Service

    def initialize(params)
      @params = params
    end

    def call
      course_usage_increment
      create_new_user_course
    end

    private

    def course_usage_increment
      course_id = @params[:course_id]
      Course.find(course_id).update(uses_count: UserCourse.where(course_id: course_id).count + 1)
    end

    def create_new_user_course
      UserCourse.new(@params)
    end
  end
end
