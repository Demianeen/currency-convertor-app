import React from 'react'
import { withLayout } from './Layout/Layout'
import { About, Converter } from './Page-components/index'

function App () {
  return (
    <>
      <Converter />
      <About/>
    </>
  )
}

export default withLayout(App)
