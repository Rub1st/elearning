import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Certificate from './certificate'
import { getCertificates } from '../../../../main_redux/actions/certificates';
import { getData } from '../../../../main_redux/actions/server_connections';

const Certificates = (props) => {

  useEffect(() => {
    props.set('certificates', getCertificates);
  }, []);

  console.log(props.certificates)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
            props.certificates.filter(el => el.user.id === props.currentUser.id).map(el =>
              <li key={el.id} className='profile__course-item'>
                <Certificate el={el}/>
              </li>)
          }
        </ul>
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
    certificates: state.certificates.certificates,
  }),
  dispatch => ({
    set: (path, setter) => dispatch(getData(path, setter)),
  })
)(Certificates)