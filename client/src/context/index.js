import { createContext } from 'react'

const AppContext = createContext({
  view: 'SEARCH',
  current: null,
  search: '',
  filters: [],
  zips: {},
})

export default AppContext

export const LS_KEY = 'cCrestMediaKitsAppContext'