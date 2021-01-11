module UserCourses
  class Update
    include Service

    def initialize(params, permit_params)
      @params = params
      @permit_params = permit_params
    end

    def call
      p @permit_params
      course_mark_update unless @permit_params[:mark].nil?

      cerificate_generation

      course_success_update
      update_user_course
    end

    private

    def cerificate_generation
      drop_previous_certificate_if_exists if @permit_params[:progress] == 100
      generate_new_certificate if @permit_params[:progress] == 100
    end

    def drop_previous_certificate_if_exists
      certificate = Certificate.find_by(course_id: @params[:course_id], user_id: @params[:user_id])
      if certificate
        certificate.destroy
      end
    end

    def generate_new_certificate
      if calculate_result > 90
        certificate = Certificate.create(course_id: @params[:course_id], user_id: @params[:user_id])

        certificate.certificate_pdf.attach(io: File.open("#{Rails.root}/app/assets/images/pudge.jpg"), filename: 'file.jpg')
      end
      nil
    end

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
        current_page: @permit_params[:current_page],
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
        current_page: @permit_params[:current_page],
        mark: @permit_params[:mark],
        is_favorite: @params[:is_favorite],
        progress: @permit_params[:progress],
        correct: calculate_result
      )
    end
  end
end
