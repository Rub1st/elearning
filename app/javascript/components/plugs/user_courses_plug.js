import JavaScriptImage from '../../photos/javascript.jpg'
import UserAvatar from '../../photos/user_avatar.jpg'

const user = {
  id: 0,
  login: 'Akira',
  email: 'dionis.rubis@gmail.com',
  fullname: 'Denis Rubis',
  password: 'Akira1231',
  userRole: 'common',
  birthday: '07/03/2001',
  avatar: UserAvatar,
}

const course = {
  "id": 1,
  "label": "JavaScript",
  "mark": 8,
  "author": {
    "login": "Kioshi",
    "avatar": UserAvatar,
  },
  "whyLabel": "",
  "whyContent": "",
  "willLabel": "",
  "willContent": "",
  "image": JavaScriptImage,
  "usesCount": 10,
  "successRate": 87,
  "pages": [],
  "tags": ["IT", "programming languages"]
 }

const userCourses = [
  {
    id: 0,
    user: user,
    course: course,
    currentPage: 2,
    isFavorite: true,
    progress: 10,
    correct: 10,
    mark: null,
  }
]

export default userCourses;