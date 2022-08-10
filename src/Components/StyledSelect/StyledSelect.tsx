import React from 'react'
import styles from './StyledSelect.module.css'
import { MenuItem, Select } from '@mui/material'
import { StyledSelectProps } from './StyledSelect.props'
import { useAppSelector } from '../../hooks/redux'
import cn from 'classnames'

const StyledSelect = ({ currencyOptions, currentCurrency, ...props }: StyledSelectProps) => {
  const theme = useAppSelector(state => state.theme)
  return (
    <Select
      { ...props }
      value={ currentCurrency }
      className={ cn(styles.select, {
        [styles.lightSelect]: theme === 'light',
        [styles.darkSelect]: theme === 'dark'
      }) }
      MenuProps={ {
        PaperProps: {
          sx: {
            height: '30% !important'
          }
        }
      } }
    >
      <MenuItem value={ currentCurrency }>{currentCurrency}</MenuItem>
      {currencyOptions.map(currency =>
      <MenuItem value={ currency } key={ currency }>{currency}</MenuItem>)}
    </Select>
  )
}

export default StyledSelect
