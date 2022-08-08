import React from 'react'
import { StyledNumberFormatProps } from './StyledNumberFormat.props'
import NumberFormat from 'react-number-format'
import styles from './StyledNumberFormat.module.css'
import cn from 'classnames'

const StyledNumberFormat = ({ className, ...props }: StyledNumberFormatProps) => {
  return (<NumberFormat
    className={ cn(styles.input, className) }
    { ...props }
  />)
}

export default StyledNumberFormat
