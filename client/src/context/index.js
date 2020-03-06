import { createContext } from 'react'

const AppContext = createContext({
  search: '',
  filters: [],
  cart: [],
  current: null,
})

export default AppContext

export const LS_KEY = 'appContext'