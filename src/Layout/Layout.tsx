import React, { FunctionComponent } from 'react'
import Header from './Header/Header'
import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css'
import { useAppSelector } from '../hooks/redux'
import cn from 'classnames'

const Layout = ({ children, ...props }: LayoutProps) => {
  const theme = useAppSelector(store => store.theme)

  return (
    <div
      className={ cn(styles.wrapper, {
        [styles.lightWrapper]: theme === 'light',
        [styles.darkWrapper]: theme === 'dark'
      }) }
      { ...props }
    >
      <Header />
      <main className={ styles.main }>{children}</main>
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent (props: T) {
    return (
      <Layout>
        <Component { ...props } />
      </Layout>
    )
  }
}
