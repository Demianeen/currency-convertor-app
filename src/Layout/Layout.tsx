import React, { FunctionComponent } from 'react'
import Header from './Header/Header'
import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css'

const Layout = ({ children, ...props }: LayoutProps) => {
  return (
    <div
      className={ styles.wrapper }
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
