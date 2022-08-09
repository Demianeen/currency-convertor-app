import { SelectProps } from '@mui/material'

export interface StyledSelectProps extends SelectProps {
  currencyOptions: string[],
  currentCurrency: string
}
