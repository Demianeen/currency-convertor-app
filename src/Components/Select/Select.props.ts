import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

export interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  currencyOptions: string[],
  currentCurrency: string
}
