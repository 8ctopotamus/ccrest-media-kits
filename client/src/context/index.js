import { createContext } from 'react'

const AppContext = createContext({
  view: null,
  current: null,
  search: '',
  filters: [],
  cart: [],
})

export default AppContext

export const LS_KEY = 'cCrestMediaAppContext'