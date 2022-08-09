import React, { memo } from 'react'
import { PProps } from './P.props'
import styles from './P.module.css'
import cn from 'classnames'

const P = ({ children, className, ...props }: PProps) => {
  return (<p
    className={ cn(styles.p, className) }
    { ...props }
  >
    {children}
  </p>)
}

export default memo(P)
