import { Dispatch, SetStateAction } from 'react'

export interface ConverterProps {
  changeFromCurrency: Dispatch<SetStateAction<string>>
}
