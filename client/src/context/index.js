import { createContext } from 'react'

const AppContext = createContext({
  cart: [],
  filters: [],
  search: '',
})

export default AppContext

export const LS_KEY = 'appContext'