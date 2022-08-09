import React from 'react'
import styles from './StyledSelect.module.css'
import { MenuItem, Select } from '@mui/material'
import { StyledSelectProps } from './StyledSelect.props'

const StyledSelect = ({ currencyOptions, currentCurrency, ...props }: StyledSelectProps) => {
  return (
    <Select
      { ...props }
      value={ currentCurrency }
      className={ styles.select }
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
