import React from 'react'
import { StyledNumberFormatProps } from './StyledNumberFormat.props'
import NumberFormat from 'react-number-format'
import styles from './StyledNumberFormat.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'

const StyledNumberFormat = ({ className, ...props }: StyledNumberFormatProps) => {
  const theme = useAppSelector(store => store.theme)
  return (<NumberFormat
    className={ cn(styles.input, className, {
      [styles.lightInput]: theme === 'light',
      [styles.darkInput]: theme === 'dark'
    }) }
    { ...props }
  />)
}

export default StyledNumberFormat
