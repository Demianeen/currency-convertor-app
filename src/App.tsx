import React from 'react'
import { withLayout } from './Layout/Layout'
import { About, ConvertorForm } from './Page-components/index'

// TODO: Add dark and light theme using useContext
function App () {
  return (
    <>
      <ConvertorForm />
      <About/>
    </>
  )
}

export default withLayout(App)
