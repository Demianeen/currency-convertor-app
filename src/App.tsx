import React from 'react'
import { withLayout } from './Layout/Layout'
import { About, Converter } from './Page-components/index'

// TODO: Add dark and light theme using useContext
function App () {
  return (
    <>
      <Converter />
      <About/>
    </>
  )
}

export default withLayout(App)
