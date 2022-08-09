import React, { memo } from 'react'
import { LabelProps } from './Label.props'
import styles from './Label.module.css'
import cn from 'classnames'

const Label = ({ children, className, ...props }: LabelProps) => {
  return (<label
    className={ cn(styles.label, className) }
    { ...props }
  >
    {children}
  </label>)
}

export default memo(Label)
