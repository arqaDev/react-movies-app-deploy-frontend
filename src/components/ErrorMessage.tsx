import React from 'react'
import { IError } from '../interfaces/interfaces'


const ErrorMessage: React.FC<IError> = ({backgroundColor, color, message}) => {
  return (
    <div>
        <h3 style={{
          backgroundColor: `${backgroundColor}`,
          color: `${color}`,
          padding: '10px',
          display: 'inline-block',
        }}>{message}</h3>
    </div>
  )
}

export default ErrorMessage