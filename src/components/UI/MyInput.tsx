import React from 'react'
import './MyInput.scss'


const MyInput = (props: any, ref: any) => {

  return (
    <input ref={ref} {...props}/>
  )
}

export default React.forwardRef(MyInput)