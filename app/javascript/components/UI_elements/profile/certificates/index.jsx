import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Certificate from './certificate'
import { getCertificates } from '../../../../main_redux/actions/certificates';
import { getData } from '../../../../main_redux/actions/server_connections';
import NoSearchResultSideBar from '../../../utils/empty_fields/no_search_result_sidebar';

const Certificates = (props) => {

  useEffect(() => {
    props.set('certificates', getCertificates);
  }, []);

  console.log(props.certificates)

  let filtered = props.certificates.filter(el => el.user.id === props.currentUser.id)

  return(
    <div className='profile__course-field'>
        <ul className='profile__course-list'>
          {
             filtered.length ? filtered.map(el =>
              <li key={el.id} className='profile__course-item'>
                <Certificate el={el}/>
              </li>) : <NoSearchResultSideBar entity={'сертификатов'}/>
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