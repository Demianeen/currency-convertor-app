import React from 'react'
import { SelectProps } from './Select.props'
import styles from './Select.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'

// TODO: Do input datalist with memoization
const Select = ({ currencyOptions, currentCurrency, className, ...props }: SelectProps) => {
  const theme = useAppSelector(store => store.theme)
  return (
    <select { ...props } className={ cn(styles.select, className, {
      [styles.lightSelect]: theme === 'light',
      [styles.darkSelect]: theme === 'dark'
    }) }>
      <option value={ currentCurrency } key={ currentCurrency }>{currentCurrency}</option>
      {currencyOptions.map(option =>
        <option key={ option } value={ option }>{option}</option>)
      }
    </select>
  )
}

export default Select
