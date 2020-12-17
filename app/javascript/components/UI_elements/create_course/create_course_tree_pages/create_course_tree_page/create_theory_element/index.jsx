import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createTheory } from '../../../../../../main_redux/actions/theories'
import { getData, postDataElement } from '../../../../../../main_redux/actions/server_connections'
import { IconButton, TextField } from '@material-ui/core'
import { ControlPoint, PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { serialize } from 'object-to-formdata';
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
    marginLeft: -30,
  },
  picture: {
    width: theme.spacing(12, 24),
    height: theme.spacing(12),
    marginTop: '-50px',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

const CreateTheoryElement = (props) => {
  const classes = useStyles();

  const { t, i18n } = useTranslation();

  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  let newTheory = {
    page_id: props.currentDraftPage.id,
    title: subtitle,
    content: content,
    image: image,
  }

  let formData = serialize({
    theory: newTheory
  })

  return(
      <div style={{marginTop: '15px'}}>
        <div>
          <TextField style={{width: '250px', marginRight: '20px'}} value={subtitle} variant='outlined' onChange={(e) => setSubtitle(e.target.value)} placeholder={t('Course.Placeholders.4')}/>
            <input accept="image/*" className={classes.input} onChange={(e) => setImage(e.target.files[0])} id="icon-button-file" type="file" />
            <label style={{marginRight: '10px'}} htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            {
              image !== null ?
              <p>{t('Course.20')}</p> : null
            }
        </div>
        <div style={{marginTop: '15px'}} className='d-flex'>
            <TextField style={{width: '350px', marginRight: '30px'}} value={content} multiline rows={2} variant='outlined' onChange={(e) => setContent(e.target.value)} placeholder={t('Course.Placeholders.5')}/>
            <IconButton disabled={!subtitle.length && !content.length && image === null} onClick={() => {
              props.post(formData, 'theories', createTheory);
              setSubtitle('');
              setContent('');
              setImage(null);
              }}>
              <ControlPoint className={classes.large}/>
            </IconButton>
        </div>
      </div>
  )
}

export default connect(
  state => ({
    currentDraftPage: state.pages.currentDraftPage
  }),
  dispatch => ({
    post: (obj, path, setter) => dispatch(postDataElement(obj, path, setter)),
    get: (path, setter) => dispatch(getData(path, setter)),
  })
)(CreateTheoryElement);