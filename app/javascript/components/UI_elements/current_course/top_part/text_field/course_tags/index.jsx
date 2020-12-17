import { Chip } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { takeRandom } from '../../../../../utils/helpful_functions'
import './course_tags.css'

let colors = ['red', 'blue', 'green', 'orange', 'purple']

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  tagIcon: {
    marginLeft: '-5px',
    width: theme.spacing(3.6),
    height: theme.spacing(3.6),
  },
  large: {
    width: theme.spacing(10,25),
    height: theme.spacing(5),
    borderRadius: '30px',
  },
}));

const CourseTags = (props) => {
  const classes = useStyles();
  console.log(props.course_tags.map(el => el.tag.name).sort())
  return(
    <div className='course__tags'>
    {
      props.course_tags.map(el => el.tag.name).sort().map((el, i) =>
         <Chip
         className={classes.large}
         key={i}
         style={{color: `${colors[takeRandom(colors.length)]}`,
                 marginRight: '10px', marginBottom: '7px',
                 borderColor: 'rgba(247, 214, 253, 0.596)'}}
         label={el}
         variant="outlined"
         />
      )
    }
  </div>
  )
}

export default connect(
  state => ({
      course_tags: state.courses.currentCourse.course_tags,
  })
)(CourseTags);