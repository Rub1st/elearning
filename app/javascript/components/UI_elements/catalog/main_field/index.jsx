import React from 'react'
import BottomPart from './bottom_part'
import './main_field.css'
import TopPart from './top_part'

const MainField = () => {
  return(
    <div className='main-field-position'>
      <TopPart/>
      <BottomPart/>
    </div>
  )
}

export default MainField;