import { createSlice } from '@reduxjs/toolkit'
import { ThemeState } from './types'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'light' as ThemeState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      state = state === 'light' ? 'dark' : 'light'
      return state
    }
  }
})
