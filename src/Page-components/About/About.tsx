import React, { memo } from 'react'
import { Htag, P } from '../../Components'
import styles from './About.module.css'
import { ReactComponent as ArrowDown } from './arrow-down.svg'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'

const About = () => {
  const theme = useAppSelector(state => state.theme)
  return (<section className={ cn(styles.section, {
    [styles.lightSection]: theme === 'dark', // reverse colors
    [styles.darkSection]: theme === 'light'
  }) }>
    <ArrowDown className={ styles.svg } />
    <Htag tag={ 'h2' } className={ styles.h2 }>{'My currency convertor'}</Htag>
    <P className={ styles.p }>{'Pocket converters are always necessary, no matter where you live. Therefore, I made it for you.'}</P>
    <P className={ styles.p }>{'This app was created as a test assignment for one company. The app is a simple currency converter. Now I try to make it even better by utilizing new technologies and my brain.'}</P>
    <P className={ styles.p }>{'The main tech stack I used:'}</P>
    <ul className={ styles.ul }>
      <li className={ styles.li }>{'React'}</li>
      <li className={ styles.li }>{'Typescript'}</li>
      <li className={ styles.li }>{'Redux + Redux toolkit'}</li>
      <li className={ styles.li }>{'RTK Query'}</li>
    </ul>
    <nav>
      <P className={ styles.p }>{'Useful links'}</P>
      <ul className={ styles.ul }>
        <li className={ styles.li }>
          <a
            className={ styles.link }
            href={ 'https://github.com/Demianeen/currency-convertor-app' }
          >
            {'This project on GitHub'}
          </a>
        </li>
        <li className={ styles.li }>
          <a
            className={ styles.link }
            href={ 'https://www.linkedin.com/in/feliche-demian-netliukh-30b0b3238/' }
          >
            {'My linkedIn'}
          </a>
        </li>
      </ul>
      <div></div>
    </nav>
  </section>)
}

// TODO: Try to remove memo
export default memo(About)
