class UserCoursesController < ApplicationController
  def create
    user_course = UserCourses::Create.call(permit_params)

    # course_usage_increment(user_course)

    if user_course.save
      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def update
    user_course = UserCourse.find(params[:id])

    UserCourses::Update.call(user_course)

    # user_course.correct = calculate_result(user_course)
    user_course = UserCourse.find(params[:id])

    if user_course.update(permit_params)
      # course_mark_update
      # course_success_update

      render json: user_course
    else
      render json: { errors: user_course.errors }, status: :unprocessable_entity
    end
  end

  def index
    render json: UserCourse.all
  end

  def show
    render json: UserCourse.find(params[:id])
  end

  private

  # def course_mark_update
  #   course_id = UserCourse.find(params[:id]).course.id
  #   user_courses = UserCourse.select { |item| item.course.id == course_id && !item.mark.nil? }
  #   Course.find(course_id).update(mark: user_courses.sum(&:mark).to_f / user_courses.count)
  # end

  # def course_success_update
  #   course_id = UserCourse.find(params[:id]).course.id
  #   user_courses = UserCourse.select { |item| item.course.id == course_id }
  #   success_user_courses = user_courses.select { |item| item.correct > 90 }
  #   Course.find(course_id).update(success_rate: (success_user_courses.count.to_f / user_courses.count) * 100)
  # end

  # def calculate_result(user_course)
  #   course_questions = Question.select { |item| item.page.order < permit_params[:current_page] }

  #   correct_questions = course_questions.select do |question|
  #     variants = Variant.select { |item| item.question.id == question.id && item.is_correct }
  #     user_answers = UserAnswer.select { |item| item.user.id == user_course.user.id && item.question.id == question.id && item.is_correct }
  #     variants.count == user_answers.count
  #   end

  #   (correct_questions.count.to_f / course_questions.count) * 100
  # end

  # def course_usage_increment(user_course)
  #   course_id = user_course.course.id
  #   Course.find(course_id).update(uses_count: UserCourse.select { |item| item.course.id == course_id }.count)
  # end

  def permit_params
    params.require(:user_course).permit(
      :user_id,
      :course_id,
      :current_page,
      :is_favorite,
      :progress,
      :correct,
      :mark
    )
  end
end

