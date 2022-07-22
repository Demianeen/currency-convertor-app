import React from 'react'
import { withLayout } from './Layout/Layout'
import { ConvertorForm } from './Page-components/index'

function App () {
  return (
    <>
      <ConvertorForm />
    </>
  )
}

export default withLayout(App)
