import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { setupStore } from './store/store'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)
const store = setupStore()

document.body.style.margin = '0'

root.render(
  <Provider store={ store }>
    <App />
  </Provider>
)
