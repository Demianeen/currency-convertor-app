import React from 'react'
import { SelectProps } from './Select.props'
import styles from './Select.module.css'
import cn from 'classnames'

const Select = ({ currencyOptions, currentCurrency, className, ...props }: SelectProps) => {
  return (<select { ...props } className={ cn(styles.select, className) }>
    <option value={ currentCurrency } key={ currentCurrency }>{currentCurrency}</option>
    {currencyOptions.map(option =>
      <option key={ option } value={ option }>{option}</option>)
    }
  </select>)
}

export default Select
