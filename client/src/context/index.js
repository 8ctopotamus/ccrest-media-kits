import { createContext } from 'react'

export const defaultState = {
  view: null,
  current: null,
  search: '',
  filters: [],
  zips: {},
}

const AppContext = createContext(defaultState)

export default AppContext

export const LS_KEY = 'cCrestMediaKitsAppContext'