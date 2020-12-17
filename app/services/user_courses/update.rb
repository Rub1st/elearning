module UserCourses
  class Update
    include Service

    def initialize(params)
      @params = params
    end

    def call
      course_mark_update unless @params[:mark].nil?
      course_success_update
      update_user_course
    end

    private

    def course_success_update
      Course.find(@params[:course_id]).update(
        success_rate: (success_count / same_user_courses.count) * 100
      )
    end

    def success_count
      same_user_courses.where(correct: (91..100)).count.to_f
    end

    def current_user_course
      UserCourse.find(@params[:id])
    end

    def same_user_courses
      UserCourse.where(course_id: @params[:course_id])
    end

    def same_user_courses_with_mark
      same_user_courses.where.not(mark: nil)
    end

    def course_mark_update
      Course.find(@params[:course_id]).update(
        mark: same_user_courses_with_mark.sum(:mark).to_f / same_user_courses_with_mark.count
      )
    end

    def done_course_questions
      Question.joins(:page).where(
        'pages.order < :current_page and pages.course_id = :course_id',
        current_page: @params[:current_page],
        course_id: @params[:course_id]
      )
    end

    def question_variants(question_id)
      Variant.where(question_id: question_id, is_correct: true)
    end

    def question_user_answers(question_id)
      UserAnswer.where(user_id: @params[:user_id], question_id: question_id, is_correct: true)
    end

    # ?
    def correctly_done_questions
      done_course_questions.select do |question|
        question_variants(question.id).count == question_user_answers(question.id).count
      end
    end

    def calculate_result
      (correctly_done_questions.count.to_f / done_course_questions.count) * 100
    end

    def update_user_course
      current_user_course.update(
        current_page: @params[:current_page],
        mark: @params[:mark],
        is_favorite: @params[:is_favorite],
        progress: @params[:progress],
        correct: calculate_result
      )
    end
  end
end
