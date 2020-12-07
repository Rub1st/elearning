import UserImage from '../../photos/user_avatar.jpg'
import Organizations from './organizations_plug'

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
        organization: Organizations[0],
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
        organization: Organizations[0],
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

export default users