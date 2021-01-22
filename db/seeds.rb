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

# def generate_id(model)
#   model.find(Faker::Number.within(range: model.first.id..model.last.id))
# end

# def generate_digit(start, finish)
#   Faker::Number.within(range: start..finish)
# end

# def generate_pharagraph(count)
#   Faker::Lorem.paragraph(sentence_count: count)
# end

# 100.times do
#   user = User.create(login: Faker::Internet.username,
#                      password: Faker::Internet.password(min_length: 10, max_length: 20),
#                      email: Faker::Internet.email,
#                      full_name: Faker::Name.name_with_middle,
#                      birthday: Date.new,
#                      user_role: generate_digit(0, 1))
#   user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "avatar_#{user.id}.jpg")
#   user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_user_#{user.id}.jpg")
# end

user = User.create(login: 'Akkkira',
                   password: 'AkiraAurumlie7',
                   email: 'dionis.rubis@gmail.com',
                   decrypted_password: 'AkiraAurumlie7',
                   full_name: 'Denis Rubis',
                   user_status: 2,
                   user_role: 1)
user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "cer_user_#{user.id}.jpg")

user = User.create(login: 'Aurumlie',
                   password: 'AkiraAurumlie7',
                   decrypted_password: 'AkiraAurumlie7',
                   email: 'efimka@mail.com',
                   full_name: 'Anastasia Efimovich',
                   user_status: 2,
                   user_role: 1)
user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "cer_user_#{user.id}.jpg")

user = User.create(login: 'Kioshi',
                   password: 'Kioshi1231',
                   decrypted_password: 'Kioshi1231',
                   email: 'fominvalerij674@gmail.com',
                   full_name: 'Nikita Romanchik',
                   user_status: 2,
                   user_role: 0)
user.avatar.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "avatar_#{user.id}.jpg")
user.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "cer_user_#{user.id}.jpg")

# 100.times do
#   organization = Organization.create(name: Faker::Company.name,
#                                      description: generate_pharagraph(5),
#                                      approve_status: generate_digit(0, 2))
#   organization.certificate_template.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_org_#{organization.id}.jpg")
# end

organization = Organization.create(name: 'Akira&Aurumlie',
                                   description: 'Your favorite clothes shop',
                                   approve_status: 2)

organization.certificate_template.attach(io: File.open('/home/akira/Desktop/elearning/app/assets/images/certificate_template_1.pdf'),
                                         filename: "certificate_org_#{organization.id}.pdf")

# 10.times do
#   RegisteredMember.create(organization: generate_id(Organization),
#                           user: generate_id(User),
#                           member_role: generate_digit(0, 1))
# end

RegisteredMember.create(organization: Organization.find_by(name: 'Akira&Aurumlie'),
                        user: User.find_by(login: 'Akkkira'),
                        member_role: 0)

RegisteredMember.create(organization: Organization.find_by(name: 'Akira&Aurumlie'),
                        user: User.find_by(login: 'Aurumlie'),
                        member_role: 0)

# 10.times do
#   UnregisteredMember.create(organization: generate_id(Organization),
#                             email: Faker::Internet.email,
#                             code: generate_digit(10_000_000, 99_999_999),
#                             member_role: generate_digit(0, 1))
# end

UnregisteredMember.create(organization: Organization.find_by(name: 'Akira&Aurumlie'),
                          email: 'takpohuieslichestno@mail.com',
                          code: '43235423',
                          member_role: 1)

# 100.times do
#   Tag.create(name: Faker::Lorem.word)
# end

Tag.create(name: 'IT')
Tag.create(name: 'Program languages')
Tag.create(name: 'People')
Tag.create(name: 'Biology')
Tag.create(name: 'Games')

# 10.times do
#   Impersonation.create(start: Date.new,
#                        end: Date.new,
#                        manager: generate_id(User),
#                        common: generate_id(User))
# end



# 100.times do
#   course = Course.create(label: Faker::Company.name,
#                          mark: generate_digit(-10, 10),
#                          why_content: generate_pharagraph(5),
#                          will_content: generate_pharagraph(5),
#                          uses_count: generate_digit(0, 100_000),
#                          success_rate: generate_digit(0, 100),
#                          access_type: generate_digit(0, 2),
#                          approve_status: generate_digit(0, 2),
#                          author: generate_id(User),
#                          organization: generate_digit(0, 1).zero? ? nil : generate_id(Organization))
#   course.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "image_#{course.id}.jpg")
# end

course = Course.create(label: 'Ruby',
                       mark: 8,
                       why_content: 'Ruby is a general-purpose language that is still popular and in high demand
                                     in the marketplace, as it’s more commonly used in Rails applications.
                                     Concise and readable, it is easy to pick up but also plenty powerful.
                                     Companies like Twitter, Soundcloud, Goodreads, and Kickstarter got their
                                     products off the ground with Ruby.',
                       will_content: 'In this course, you will gain familiarity with Ruby and basic programming
                                      concepts—including variables, loops, control flow, and most importantly,
                                      object-oriented programming. You’ll get a chance to test your understanding
                                      in a final project, which you’ll build locally.',
                      uses_count: 10000,
                      success_rate: 87,
                      access_type: 0,
                      approve_status: 2,
                      course_status: 1,
                      author: User.find_by(login: 'Akkkira'),
                      organization: nil)

course.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "course_#{course.id}.jpg")

# 10.times do |element|
#   Page.create(course: generate_id(Course),
#               order: element,
#               title: Faker::Lorem.sentence)
# end

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 1,
            title: 'Variables and Data types')

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 2,
            title: 'Arrays and Hashes')

Page.create(course: Course.find_by(label: 'Ruby'),
            order: 3,
            title: 'Everything about everything')

# 10.times do
#   Question.create(page: generate_id(Page),
#                   question_text: Faker::Lorem.question,
#                   question_type: generate_digit(0, 1),
#                   title: Faker::Lorem.sentence,
#                   description: Faker::Lorem.sentence,
#                   difficult: generate_digit(0, 2))
# end

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
# 10.times do |element|
#   Variant.create(question: generate_id(Question),
#                  value: Faker::Lorem.word,
#                  order: element)
# end

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

# 10.times do |element|
#   Answer.create(question: generate_id(Question),
#                 value: Faker::Lorem.word,
#                 order: element)
# end

# 10.times do
#   Comment.create(course: generate_id(Course),
#                  content: generate_pharagraph(2),
#                  author: generate_id(User))
# end

Comment.create(course: Course.find_by(label: 'Ruby'),
               content: 'It\'s awesome <3',
               author: User.find_by(login: 'Aurumlie'))

Comment.create(course: Course.find_by(label: 'Ruby'),
               content: 'The best course in the world!!!',
               author: User.find_by(login: 'Kioshi'))

# 10.times do
#   Reply.create(comment: generate_id(Comment),
#                content: generate_pharagraph(2),
#                author: generate_id(User))
# end

Reply.create(comment: Comment.find_by(content: 'It\'s awesome <3'),
             content: 'I\'m agree',
             author: User.find_by(login: 'Kioshi'))

Reply.create(comment: Comment.find_by(content: 'It\'s awesome <3'),
             content: 'Thanks <3',
             author: User.find_by(login: 'Akkkira'))

Reply.create(comment: Comment.find_by(content: 'The best course in the world!!!'),
             content: 'Thank you so much :)',
             author: User.find_by(login: 'Akkkira'))

# 10.times do
#   CourseTag.create(course: generate_id(Course),
#                    tag: generate_id(Tag))
# end

CourseTag.create(course: Course.find_by(label: 'Ruby'),
                 tag: Tag.find_by(name: 'IT'))

CourseTag.create(course: Course.find_by(label: 'Ruby'),
                 tag: Tag.find_by(name: 'Program languages'))

# 10.times do
#   certificate = Certificate.create(course: generate_id(Course),
#                                    user: generate_id(User))
#   certificate.certificate_pdf.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "certificate_#{certificate.id}.jpg")
# end

# 10.times do
#   UserCourse.create(course: generate_id(Course),
#                     user: generate_id(User),
#                     current_page: 1,
#                     is_favorite: Faker::Boolean.boolean,
#                     progress: generate_digit(0, 100),
#                     correct: generate_digit(0, 100),
#                     mark: generate_digit(-10, 10))
# end

# 10.times do
#   UserAnswer.create(question: generate_id(Question),
#                     user: generate_id(User),
#                     is_correct: Faker::Boolean.boolean,
#                     answer: Faker::Lorem.word)
# end

# 10.times do
#   Report.create(course: generate_id(Course),
#                 percent_try: generate_digit(0, 100),
#                 count_try: generate_digit(0, 1000),
#                 count_failed: generate_digit(0, 500),
#                 count_complete: generate_digit(0, 500),
#                 average_mark: generate_digit(-10, 10))
# end

# 10.times do
#   theory = Theory.create(title: Faker::Lorem.sentence,
#                          content: generate_pharagraph(7),
#                          page: generate_id(Page))
#   theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")
# end

theory = Theory.create(title: 'Variables',
                       content: 'Variables are the memory locations, which hold any data
                                 to be used by any program.\n There are five types of variables
                                 supported by Ruby. You already have gone through a small description
                                 of these variables in the previous chapter as well. These five types of
                                 variables are explained in this chapter.',
                       page: Page.find_by(title: 'Variables and Data types'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Data types',
                       content: 'Data types in Ruby represent different categories of data such as text, string,
                                 numbers, etc. Since Ruby is an object-oriented language, all its supported data
                                 types are implemented as classes.\n Have a look at the various data types supported
                                 by Ruby in the illustration below:',
                       page: Page.find_by(title: 'Variables and Data types'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Conclusion',
                       content: 'Assignment to uninitialized local variables also serves as variable declaration.
                                 The variables start to exist until the end of the current scope is reached. The
                                 lifetime of local variables is determined when Ruby parses the program.',
                       page: Page.find_by(title: 'Variables and Data types'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Arrays',
                       content: 'Arrays are the memory locations, which hold any data to be used by any program.
                                 There are five types of variables supported by Ruby. You already have gone through
                                 a small description of these variables in the previous chapter as well. These five
                                 types of variables are explained in this chapter.',
                       page: Page.find_by(title: 'Arrays and Hashes'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Hashes',
                       content: 'Hashes in Ruby represent different categories of data such as text, string, numbers,
                                 etc. Since Ruby is an object-oriented language, all its supported data types are
                                 implemented as classes.\n Have a look at the various data types supported by Ruby in
                                 the illustration below:',
                       page: Page.find_by(title: 'Arrays and Hashes'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Conclusion',
                       content: 'Assignment to uninitialized local variables also serves as variable declaration.
                                 The variables start to exist until the end of the current scope is reached. The
                                 lifetime of local variables is determined when Ruby parses the program.',
                       page: Page.find_by(title: 'Arrays and Hashes'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")

theory = Theory.create(title: 'Has you already loved ruby?',
                       content: 'Arrays are the memory locations, which hold any data to be used by any program.
                                 There are five types of variables supported by Ruby. You already have gone through
                                 a small description of these variables in the previous chapter as well. These five
                                 types of variables are explained in this chapter.',
                       page: Page.find_by(title: 'Everything about everything'))

theory.image.attach(io: File.open('/home/akira/Pictures/pudge.jpg'), filename: "theory_#{theory.id}.jpg")
