# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def generate_id(model)
  model.find(Faker::Number.within(range: model.first.id..model.last.id))
end

def generate_digit(start, finish)
  Faker::Number.within(range: start..finish)
end

def generate_pharagraph(count)
  Faker::Lorem.paragraph(sentence_count: count)
end

10.times do
  User.create(login: Faker::Internet.username,
              password: Faker::Internet.password(min_length: 10, max_length: 20),
              email: Faker::Internet.email,
              fullname: Faker::Name.name_with_middle,
              birthday: Date.new,
              user_role: generate_digit(0, 1))
end

10.times do
  Organization.create(name: Faker::Company.name,
                      description: generate_pharagraph(5))
end

10.times do
  OrganizationMember.create(organization: generate_id(Organization),
                            user: generate_id(User),
                            member_role: generate_digit(0, 1))
end

10.times do
  Course.create(name: Faker::Company.name,
                description: generate_pharagraph(5),
                access_type: generate_digit(0, 2),
                course_status: generate_digit(0, 1))
end

10.times do
  Page.create(course: generate_id(Course),
              content: generate_pharagraph(15))
end

10.times do
  Question.create(page: generate_id(Page),
                  content: Faker::Lorem.question,
                  question_type: generate_digit(0, 1))
end

10.times do
  Answer.create(question: generate_id(Question),
                content: generate_pharagraph(1))
end

10.times do
  Comment.create(course: generate_id(Course),
                 content: generate_pharagraph(2))
end

10.times do
  ReplyComment.create(comment: generate_id(Comment),
                      content: generate_pharagraph(2))
end

10.times do
  Tag.create(name: Faker::Lorem.word)
end

10.times do
  CourseTag.create(course: generate_id(Course),
                   tag: generate_id(Tag))
end

10.times do
  Certificate.create(course: generate_id(Course),
                     user: generate_id(User))
end

10.times do
  UserCourse.create(course: generate_id(Course),
                    user: generate_id(User),
                    is_favorite: Faker::Boolean.boolean,
                    progress: generate_digit(0, 100),
                    mark: generate_digit(-10, 10),
                    course_status: generate_digit(0, 1))
end

10.times do
  UserAnswer.create(question: generate_id(Question),
                    user_course: generate_id(UserCourse),
                    is_correct: Faker::Boolean.boolean,
                    answer: generate_pharagraph(3))
end
