module UserCourses
  class Update
    include Service
    include Rails.application.routes.url_helpers

    attr_accessor :params, :permit_params

    def initialize(params, permit_params)
      @params = params
      @permit_params = permit_params
    end

    def call
      course_mark_update unless permit_params[:mark].nil?

      cerificate_generation

      course_success_update
      update_user_course
    end

    private

    def cerificate_generation
      drop_previous_certificate_if_exists if permit_params[:progress] == 100
      generate_new_certificate if permit_params[:progress] == 100 && calculate_result > 90
    end

    def drop_previous_certificate_if_exists
      certificate = Certificate.find_by(course_id: params[:course_id], user_id: params[:user_id])
      certificate&.destroy
    end

    def raw_file(item)
      @raw_file ||= URI.parse(url_for(item.certificate_template)).open
    end

    def certificate_creating
      Certificate.create(course_id: params[:course_id], user_id: params[:user_id])
    end

    def course_organization
      org_id = Course.find(params[:course_id]).organization_id
      Organization.find(org_id) unless org_id.nil?
    end

    def course_author
      User.find(Course.find(params[:course_id]).author_id)
    end

    def pdftk
      PdfForms.new('/usr/bin/pdftk')
    end

    def create_temp_certificate(item)
      Tempfile.new(["certificate_template_#{item.id}", 'pdf'], Rails.root.join('tmp/'))
    end

    def write_temp_certificate(certificate, item)
      file = create_temp_certificate(certificate)
      file.binmode
      file.write(raw_file(item).read)
      file
    end

    def fill_temp_certificate(certificate, path)
      pdftk.fill_form path,
                      "tmp/certificate_#{certificate.id}.pdf",
                      course_label: Course.find(params[:course_id]).label,
                      user_name: User.find(params[:user_id]).full_name,
                      finish_date: certificate.created_at
    end

    def attach_certificate_pdf(certificate)
      certificate.certificate_pdf.attach(io: File.open("tmp/certificate_#{certificate.id}.pdf"),
                                         filename: "certificate_#{certificate.id}.pdf")
    end

    def generate_new_certificate
      certificate = certificate_creating
      organization = course_organization
      if !organization.nil?
        fill_temp_certificate(certificate, write_temp_certificate(certificate, organization).path)
      elsif course_author.certificate_template.attached?
        fill_temp_certificate(certificate, write_temp_certificate(certificate, course_author).path)
      else
        fill_temp_certificate(certificate, 'app/assets/images/certificate_template.pdf')
      end
      attach_certificate_pdf(certificate)
    end

    def course_success_update
      Course.find(params[:course_id]).update(
        success_rate: (success_count / same_user_courses.count) * 100
      )
    end

    def success_count
      same_user_courses.where(correct: (91..100)).count.to_f
    end

    def current_user_course
      UserCourse.find(params[:id])
    end

    def same_user_courses
      @same_user_courses ||= UserCourse.where(course_id: params[:course_id])
    end

    def same_user_courses_with_mark
      @same_user_courses_with_mark ||= same_user_courses.where.not(mark: nil)
    end

    def course_mark_update
      Course.find(params[:course_id]).update(
        mark: same_user_courses_with_mark.sum(:mark).to_f / same_user_courses_with_mark.count
      )
    end

    def done_course_questions
      @done_course_questions ||= Question.joins(:page).where(
        'pages.order < :current_page and pages.course_id = :course_id',
        current_page: permit_params[:current_page],
        course_id: params[:course_id]
      )
    end

    def question_variants(question_id)
      Variant.where(question_id: question_id, is_correct: true)
    end

    def question_user_answers(question_id)
      UserAnswer.where(user_id: params[:user_id], question_id: question_id, is_correct: true)
    end

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
        current_page: permit_params[:current_page],
        mark: permit_params[:mark],
        is_favorite: params[:is_favorite],
        progress: permit_params[:progress],
        correct: calculate_result
      )
    end
  end
end
