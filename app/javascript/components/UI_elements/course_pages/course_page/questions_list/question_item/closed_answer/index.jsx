import React,{useState} from 'react'
import { connect } from 'react-redux';
import { postDataElement } from '../../../../../../../main_redux/actions/server_connections';
import { getUserAnswers } from '../../../../../../../main_redux/actions/user_answers';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const ClosedAnswer = (props) => {
  const [answer, setAnswer] = useState('')

  let newClosedQuestion = {
    question_id: props.el.id,
    user_id: props.currentUser.id,
    answer: answer,
    is_correct: props.el.variants.filter(el => el.value === answer).length
  }
  return(
    <div>
    <TextField label={'put answer here'} variant="outlined" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
      <IconButton disabled={answer.split(' ').join('') === ''}
        onClick={() => props.post(newClosedQuestion, 'user_answers', getUserAnswers)}>
          <SendOutlinedIcon/>
      </IconButton>
  </div>
  )
}

export default connect(
  state => ({
    currentUser: state.users.currentUser,
}),
  dispatch => ({
  post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
 })
)(ClosedAnswer);