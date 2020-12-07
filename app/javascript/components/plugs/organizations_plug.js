import UserImage from '../../photos/user_avatar.jpg'

const users = [
  {
    id: 0,
    login: 'Akira',
    email: 'dionis.rubis@gmail.com',
    fullname: 'Denis Rubis',
    password: 'Akira1231',
    userRole: 'common',
    birthday: '07/03/2001',
    avatar: UserImage,
    organizations: [
      {
        id: 0,
        organization: 0,
        role: 'manager',
      }
    ]
  },
  {
    id: 1,
    login: 'Aurumlie',
    email: 'dionis.rubis@gmail.com',
    fullname: 'Anastasija Efimovich',
    password: 'Akira1231',
    userRole: 'common',
    birthday: '07/03/2001',
    avatar: UserImage,
    organizations: [
      {
        id: 0,
        organization: 0,
        role: 'common',
      }
    ]
  },
  {
    id: 2,
    login: 'Kioshi',
    email: 'dionis.rubis@gmail.com',
    fullname: 'Nikita Romanchik',
    password: 'Akira1231',
    userRole: 'common',
    birthday: '07/03/2001',
    avatar: UserImage,
    organizations: []
  },
]

const organizations = [
  {
    id: 0,
    name: 'Akira&Aurumlie',
    description: 'clothes products',
    status: 'approved',
    registredMembers: [
      {
        id: 0,
        user: users.find(el => el.id === 0),
        role: 'manager',
      },
      {
        id: 1,
        user: users.find(el => el.id === 1),
        role: 'common',
      },
    ]
  }
]

export default organizations