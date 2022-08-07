import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: ReactNode
}
