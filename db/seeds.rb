# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Answer.destroy_all
Theory.destroy_all
RegisteredMember.destroy_all
UnregisteredMember.destroy_all
Certificate.destroy_all
Reply.destroy_all
Comment.destroy_all
UserCourse.destroy_all
Report.destroy_all
Variant.destroy_all
UserAnswer.destroy_all
Question.destroy_all
Page.destroy_all
CourseTag.destroy_all
Tag.destroy_all
Impersonation.destroy_all
Course.destroy_all
Organization.destroy_all
User.destroy_all

def generate_id(model)
  model.find(Faker::Number.within(range: model.first.id..model.last.id))
end

def generate_digit(start, finish)
  Faker::Number.within(range: start..finish)
end

def generate_pharagraph(count)
  Faker::Lorem.paragraph(sentence_count: count)
end

100.times do
  user = User.create(login: Faker::Internet.username,
                     password: Faker::Internet.password(min_length: 10, max_length: 20),
                     email: Faker::Internet.email,
                     full_name: Faker::Name.name_with_middle,
                     birthday: Date.new,
                     user_role: generate_digit(0, 1))
  user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "avatar_#{user.id}.jpg")
  user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_user_#{user.id}.jpg")
end

100.times do
  organization = Organization.create(name: Faker::Company.name,
                                     description: generate_pharagraph(5),
                                     approve_status: generate_digit(0, 2))
  organization.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_org_#{organization.id}.jpg")
end

10.times do
  RegisteredMember.create(organization: generate_id(Organization),
                          user: generate_id(User),
                          member_role: generate_digit(0, 1))
end

10.times do
  UnregisteredMember.create(organization: generate_id(Organization),
                            email: Faker::Internet.email,
                            code: generate_digit(10_000_000, 99_999_999),
                            member_role: generate_digit(0, 1))
end

100.times do
  Tag.create(name: Faker::Lorem.word)
end

10.times do
  Impersonation.create(start: Date.new,
                       end: Date.new,
                       manager: generate_id(User),
                       common: generate_id(User))
end

100.times do
  course = Course.create(label: Faker::Company.name,
                         mark: generate_digit(-10, 10),
                         why_content: generate_pharagraph(5),
                         will_content: generate_pharagraph(5),
                         uses_count: generate_digit(0, 100_000),
                         success_rate: generate_digit(0, 100),
                         access_type: generate_digit(0, 2),
                         approve_status: generate_digit(0, 2),
                         author: generate_id(User),
                         organization: generate_digit(0, 1).zero? ? nil : generate_id(Organization))
  course.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "image_#{course.id}.jpg")
end

10.times do |element|
  Page.create(course: generate_id(Course),
              order: element,
              title: Faker::Lorem.sentence)
end

10.times do
  Question.create(page: generate_id(Page),
                  question_text: Faker::Lorem.question,
                  question_type: generate_digit(0, 1),
                  title: Faker::Lorem.sentence,
                  description: Faker::Lorem.sentence,
                  difficult: generate_digit(0, 2))
end

10.times do |element|
  Variant.create(question: generate_id(Question),
                 value: Faker::Lorem.word,
                 order: element)
end

10.times do |element|
  Answer.create(question: generate_id(Question),
                value: Faker::Lorem.word,
                order: element)
end

10.times do
  Comment.create(course: generate_id(Course),
                 content: generate_pharagraph(2),
                 author: generate_id(User))
end

10.times do
  Reply.create(comment: generate_id(Comment),
               content: generate_pharagraph(2),
               author: generate_id(User))
end

10.times do
  CourseTag.create(course: generate_id(Course),
                   tag: generate_id(Tag))
end

10.times do
  certificate = Certificate.create(course: generate_id(Course),
                                   user: generate_id(User))
  certificate.certificate_pdf.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_#{certificate.id}.jpg")
end

10.times do
  UserCourse.create(course: generate_id(Course),
                    user: generate_id(User),
                    current_page: 1,
                    is_favorite: Faker::Boolean.boolean,
                    progress: generate_digit(0, 100),
                    correct: generate_digit(0, 100),
                    mark: generate_digit(-10, 10))
end

10.times do
  UserAnswer.create(question: generate_id(Question),
                    user: generate_id(User),
                    is_correct: Faker::Boolean.boolean,
                    answer: Faker::Lorem.word)
end

10.times do
  Report.create(course: generate_id(Course),
                percent_try: generate_digit(0, 100),
                count_try: generate_digit(0, 1000),
                count_failed: generate_digit(0, 500),
                count_complete: generate_digit(0, 500),
                average_mark: generate_digit(-10, 10))
end

10.times do
  theory = Theory.create(title: Faker::Lorem.sentence,
                         content: generate_pharagraph(7),
                         page: generate_id(Page))
  theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")
end
