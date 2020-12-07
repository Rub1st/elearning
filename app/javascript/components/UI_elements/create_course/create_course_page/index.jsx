import { Paper } from '@material-ui/core'
import React from 'react'
import CreateCourseForm from './create_course_form'
import './create_course_page.css'

const CreateCoursePage = () => {
  return(
    <div className='create-course-page__window'>
      <div className='create-course-label'>
        Создание курса
      </div>
      <div className='create-course-page__field'>
        <div className='create-course-page__discription'>
          <Paper className='create-organization-description'>
            <h4>Зачем нужны курсы?</h4>
            <p>Курсы помогают пользователям развиваться в тех областях, которые им интересны, а также расширяют кругозор тем, кого не интересует что-то конкретное.</p>
            <h4>Как создать свой курс?</h4>
            <p>Создать свой курс очень просто и интересно! Это происходит в 4 этапа: сначала вы указываете название, описание и аватар курса; затем выбираете создаете ли вы курс от себя или от какой-то организации (если таковые есть) и тип доступа к курсу; после чего из списка тегов выбираете те, что лучше всего описывают ваш курс и на последок создаете страницы с теорией и вопросами, после завершения создания, курс попадет на рассмотрение к админам, а затем, в случае одобрения, в общий доступ.</p>
            <h4>Управление курсами</h4>
            <p>В профиле в разделе "мои курсы" вам будут доступны ваши курсы с возможностью просмотра, удаления и редактирования. Курсами, созданными от лица организации можно управлять в разделе "организации", нажав на стрелочку "вниз" на организации.</p>
            <h5>Удачи! И помните: учение - свет!</h5>
          </Paper>
        </div>
        <div className='create-course-page__create-form'>
          <CreateCourseForm/>
        </div>
      </div>
    </div>
  )
}

export default CreateCoursePage;