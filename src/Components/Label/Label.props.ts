import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react'

export interface LabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: ReactNode
}
