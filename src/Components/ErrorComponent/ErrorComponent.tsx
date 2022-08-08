import React, { memo } from 'react'
import { Htag } from '..'
import { HtagProps } from './ErrorComponent.props'

const ErrorComponent = ({ error }: HtagProps) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

    return (
      <div>
        <Htag tag={ 'h1' }>{'An error has occurred:'}</Htag>
        <Htag tag={ 'h2' }>{errMsg}</Htag>
      </div>
    )
  }
  return <Htag tag={ 'h1' }>{error.message}</Htag>
}

export default memo(ErrorComponent)
