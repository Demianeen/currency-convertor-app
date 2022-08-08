import React, { memo } from 'react'
import styles from './ThemeSwitcher.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { ReactComponent as Sun } from './sun.svg'
import { ReactComponent as Moon } from './moon.svg'
import { themeSlice } from '../../store/reducers/theme/slice'
import Switch from 'react-switch'

const ToggleThemeButton = () => {
  const dispatch = useAppDispatch()
  const { toggleTheme } = themeSlice.actions
  const theme = useAppSelector(state => state.theme)
  return (<Switch
    onChange={ () => dispatch(toggleTheme()) }
    checked={ theme === 'light' }
    checkedIcon={ <div className={ styles.svgContainer }><Sun /></div> }
    uncheckedIcon={ <div className={ styles.svgContainer }><Moon /></div> }
  />)
}

export default memo(ToggleThemeButton)
