import React from 'react'
import { InputProps } from './Input.props'
import styles from './Input.module.css'
import cn from 'classnames'

const Input = ({ className, ...props }: InputProps) => {
  return (<input
    className={ cn(styles.input, className) }

    { ...props }
  />)
}

export default Input
