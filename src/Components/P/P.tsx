import React, { memo } from 'react'
import { HtagProps } from './P.props'
import styles from './P.module.css'
import cn from 'classnames'

const P = ({ children, className, ...props }: HtagProps) => {
  return (<p
    className={ cn(styles.p, className) }
    { ...props }
  >
    {children}
  </p>)
}

export default memo(P)
