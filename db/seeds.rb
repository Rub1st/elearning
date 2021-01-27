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
  id = generate_digit(model.first.id, model.last.id)

  model.find(id)
end

def generate_digit(start, finish)
  Faker::Number.within(range: start..finish)
end

def generate_pharagraph(count)
  Faker::Lorem.paragraph(sentence_count: count)
end

# generate users

30.times do
  user = User.create(login: Faker::Internet.username,
                     password: Faker::Internet.password(min_length: 6, max_length: 6),
                     email: Faker::Internet.email,
                     full_name: Faker::Name.name_with_middle,
                     confirmed_at: Time.now.utc,
                     user_role: 1)
  user.avatar.attach(io: File.open(Rails.root.join('app/assets/images/pudge.jpg')), filename: "avatar_#{user.id}.jpg")
  user.certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template_2.pdf')),
                                   filename: "cer_user_#{user.id}.pdf")
end

user = User.create(login: 'Akkkira',
                   password: 'AkiraAurumlie7',
                   email: 'dionis.rubis@gmail.com',
                   full_name: 'Denis Rubis',
                   user_status: 0,
                   confirmed_at: Time.now.utc,
                   user_role: 1)
user.avatar.attach(io: File.open(Rails.root.join('app/assets/images/pudge.jpg')), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template_2.pdf')),
                                 filename: "cer_user_#{user.id}.pdf")

user = User.create(login: 'Aurumlie',
                   password: 'AkiraAurumlie7',
                   email: 'efimka@mail.com',
                   full_name: 'Anastasia Efimovich',
                   user_status: 0,
                   confirmed_at: Time.now.utc,
                   user_role: 1)
user.avatar.attach(io: File.open(Rails.root.join('app/assets/images/pudge.jpg')), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template_2.pdf')),
                                 filename: "cer_user_#{user.id}.pdf")

user = User.create(login: 'Kioshi',
                   password: 'Kioshi1231',
                   email: 'fominvalerij674@gmail.com',
                   full_name: 'Nikita Romanchik',
                   user_status: 0,
                   confirmed_at: Time.now.utc,
                   user_role: 0)
user.avatar.attach(io: File.open(Rails.root.join('app/assets/images/pudge.jpg')), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template_2.pdf')),
                                 filename: "cer_user_#{user.id}.pdf")

organization = Organization.create(name: 'ITechArt Group',
                                   description: 'Top 1 in the IT sphere',
                                   approve_status: 2)

organization
  .certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template_1.pdf')),
                               filename: "certificate_org_#{organization.id}.pdf")

RegisteredMember.create(organization: organization,
                        user: User.find_by(email: 'dionis.rubis@gmail.com'),
                        member_role: 0)

User.all.limit(20).each do |item|
  next if item.user_role == 'admin' || item.login == 'Akkkira'

  RegisteredMember.create(organization_id: organization.id,
                          user_id: item.id,
                          member_role: 1)
end

10.times do
  UnregisteredMember.create(organization: organization,
                            email: Faker::Internet.email,
                            code: generate_digit(10_000_000, 99_999_999),
                            member_role: 1)
end

2.times do
  organization = Organization.create(name: Faker::Company.name,
                                     description: generate_pharagraph(5),
                                     approve_status: 2)
  organization
    .certificate_template.attach(io: File.open(Rails.root.join('app/assets/images/certificate_template.pdf')),
                                 filename: "certificate_org_#{organization.id}.pdf")

  RegisteredMember.create(organization: organization,
                          user: User.find_by(email: 'dionis.rubis@gmail.com'),
                          member_role: 1)
end

Tag.create(name: 'IT')
Tag.create(name: 'Program languages')
Tag.create(name: 'People')
Tag.create(name: 'Biology')
Tag.create(name: 'Games')

Tag.create(name: 'Art')
Tag.create(name: 'Sport')
Tag.create(name: 'Hand Made')
Tag.create(name: 'Books')
Tag.create(name: 'Love')

Tag.create(name: 'Anime')
Tag.create(name: 'Work')
Tag.create(name: 'Success')
Tag.create(name: 'Money')
Tag.create(name: 'Crypto')

Tag.create(name: 'Films')
Tag.create(name: 'Fantasy')
Tag.create(name: 'Food')
Tag.create(name: 'Alcohol')
Tag.create(name: 'Travel')

def generate_public_course(image_url)
  course = Course.create(label: Faker::Company.name,
                         mark: generate_digit(-10, 10),
                         why_content: generate_pharagraph(10),
                         will_content: generate_pharagraph(10),
                         uses_count: generate_digit(0, 100_000),
                         success_rate: generate_digit(0, 100),
                         access_type: 0,
                         approve_status: 2,
                         course_status: 1,
                         author: generate_id(User),
                         organization: nil)
  course.image.attach(io: File.open(Rails.root.join(image_url)), filename: "image_#{course.id}.jpg")
  course
end

generate_public_course('app/assets/images/course_image_1.jpg')
generate_public_course('app/assets/images/course_image_2.jpg')
generate_public_course('app/assets/images/course_image_3.jpg')
generate_public_course('app/assets/images/course_image_4.jpg')
generate_public_course('app/assets/images/course_image_5.jpg')
generate_public_course('app/assets/images/course_image_6.jpg')
generate_public_course('app/assets/images/course_image_7.jpg')
generate_public_course('app/assets/images/course_image_8.jpg')
generate_public_course('app/assets/images/course_image_9.jpg')
generate_public_course('app/assets/images/course_image_10.jpg')

course = Course.create(label: 'Ruby',
                       mark: nil,
                       why_content: 'Ruby is a general-purpose language that is still popular and in high demand
                                     in the marketplace, as it’s more commonly used in Rails applications.
                                     Concise and readable, it is easy to pick up but also plenty powerful.
                                     Companies like Twitter, Soundcloud, Goodreads, and Kickstarter got their
                                     products off the ground with Ruby.',
                       will_content: 'In this course, you will gain familiarity with Ruby and basic programming
                                      concepts—including variables, loops, control flow, and most importantly,
                                      object-oriented programming. You’ll get a chance to test your understanding
                                      in a final project, which you’ll build locally.',
                       uses_count: 0,
                       success_rate: 0,
                       access_type: 0,
                       approve_status: 2,
                       course_status: 1,
                       author: User.find_by(login: 'Akkkira'),
                       organization: nil)

course.image.attach(io: File.open(Rails.root.join('app/assets/images/course_image_11.jpg')),
                    filename: "course_#{course.id}.jpg")

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 1,
            title: 'Variables and Data types')

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 2,
            title: 'Arrays and Hashes')

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 3,
            title: 'Everything about everything')

Question.create(page: Page.find_by(title: 'Variables and Data types'),
                question_text: 'which data types exist?',
                question_type: 1,
                title: 'choose data types',
                description: 'you need to choose existing data types',
                difficult: 0)

Question.create(page: Page.find_by(title: 'Variables and Data types'),
                question_text: 'how we are creating variables in ruby?',
                question_type: 0,
                title: 'create variable',
                description: 'you need to create variable named \'a\' and
                              save in it 77 (please keep spaces between symbols).',
                difficult: 0)

Question.create(page: Page.find_by(title: 'Arrays and Hashes'),
                question_text: 'which of these can help us in array creating?',
                question_type: 1,
                title: 'creating arrays',
                description: 'choose all variants with which we can create array',
                difficult: 0)

Question.create(page: Page.find_by(title: 'Arrays and Hashes'),
                question_text: 'how looks the famous \'hash rocket\'?',
                question_type: 0,
                title: 'hash rocket',
                description: 'you need to write a \'hash rocket\'',
                difficult: 0)

Question.create(page: Page.find_by(title: 'Everything about everything'),
                question_text: 'Do you love ruby?',
                question_type: 0,
                title: 'In love with ruby <3',
                description: 'Answer honestly',
                difficult: 2)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'int',
               is_correct: true,
               order: 1)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'hash',
               is_correct: true,
               order: 2)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'float',
               is_correct: true,
               order: 3)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'double',
               is_correct: false,
               order: 4)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'array',
               is_correct: true,
               order: 5)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'range',
               is_correct: true,
               order: 6)

Variant.create(question: Question.find_by(title: 'choose data types'),
               value: 'decimal',
               is_correct: false,
               order: 7)
Variant.create(question: Question.find_by(title: 'create variable'),
               value: 'a = 77',
               is_correct: true,
               order: 1)

Variant.create(question: Question.find_by(title: 'creating arrays'),
               value: 'Array.new',
               is_correct: true,
               order: 1)

Variant.create(question: Question.find_by(title: 'creating arrays'),
               value: '[]',
               is_correct: true,
               order: 2)

Variant.create(question: Question.find_by(title: 'creating arrays'),
               value: 'new Array()',
               is_correct: false,
               order: 3)

Variant.create(question: Question.find_by(title: 'hash rocket'),
               value: '=>',
               is_correct: true,
               order: 1)

Variant.create(question: Question.find_by(title: 'In love with ruby <3'),
               value: 'Of course I love ruby <3',
               is_correct: true,
               order: 1)

Comment.create(course: Course.find_by(label: 'Ruby'),
               content: 'It\'s awesome <3',
               author: User.find_by(login: 'Aurumlie'))

Comment.create(course: Course.find_by(label: 'Ruby'),
               content: 'The best course in the world!!!',
               author: User.find_by(login: 'Kioshi'))

Reply.create(comment: Comment.find_by(content: 'It\'s awesome <3'),
             content: 'I\'m agree',
             author: User.find_by(login: 'Kioshi'))

Reply.create(comment: Comment.find_by(content: 'It\'s awesome <3'),
             content: 'Thanks <3',
             author: User.find_by(login: 'Akkkira'))

Reply.create(comment: Comment.find_by(content: 'The best course in the world!!!'),
             content: 'Thank you so much :)',
             author: User.find_by(login: 'Akkkira'))

CourseTag.create(course: Course.find_by(label: 'Ruby'),
                 tag: Tag.find_by(name: 'IT'))

CourseTag.create(course: Course.find_by(label: 'Ruby'),
                 tag: Tag.find_by(name: 'Program languages'))

theory = Theory.create(title: 'Variables',
                       content: 'Variables are the memory locations, which hold any data
                                 to be used by any program.\n There are five types of variables
                                 supported by Ruby. You already have gone through a small description
                                 of these variables in the previous chapter as well. These five types of
                                 variables are explained in this chapter.',
                       page: Page.find_by(title: 'Variables and Data types'))

theory.image.attach(io: File.open(Rails.root.join('app/assets/images/page_1_course_ruby_1.jpg')),
                    filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Data types',
                       content: 'Data types in Ruby represent different categories of data such as text, string,
                                 numbers, etc. Since Ruby is an object-oriented language, all its supported data
                                 types are implemented as classes.\n Have a look at the various data types supported
                                 by Ruby in the illustration below:',
                       page: Page.find_by(title: 'Variables and Data types'))

theory.image.attach(io: File.open(Rails.root.join('app/assets/images/page_1_course_ruby_2.jpg')),
                    filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Arrays',
                       content: 'Arrays are the memory locations, which hold any data to be used by any program.
                                 There are five types of variables supported by Ruby. You already have gone through
                                 a small description of these variables in the previous chapter as well. These five
                                 types of variables are explained in this chapter.',
                       page: Page.find_by(title: 'Arrays and Hashes'))

theory.image.attach(io: File.open(Rails.root.join('app/assets/images/page_2_course_ruby_1.jpg')),
                    filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Hashes',
                       content: 'Hashes in Ruby represent different categories of data such as text, string, numbers,
                                 etc. Since Ruby is an object-oriented language, all its supported data types are
                                 implemented as classes.\n Have a look at the various data types supported by Ruby in
                                 the illustration below:',
                       page: Page.find_by(title: 'Arrays and Hashes'))

theory.image.attach(io: File.open(Rails.root.join('app/assets/images/page_2_course_ruby_2.jpg')),
                    filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Conclusion',
                       content: '',
                       page: Page.find_by(title: 'Everything about everything'))

theory.image.attach(io: File.open(Rails.root.join('app/assets/images/page_1_course_ruby_3.jpg')),
                    filename: "theory_#{theory.id}.jpg")
