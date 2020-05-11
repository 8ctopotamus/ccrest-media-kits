import { LS_KEY } from './index'
import { defaultState } from '.'

const updateLocalStorage = state => {
  if (window && window.localStorage && localStorage.getItem(LS_KEY) !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }
}

export default (state, action) => {
  let updatedState
  let slug
  let file
  switch(action.type) {
    case 'GET_LOCALSTORAGE':
      if (window && window.localStorage && localStorage.getItem(LS_KEY) !== 'undefined') {
        const ls = localStorage.getItem(LS_KEY)
        return ls ? JSON.parse(ls) : defaultState
      }
      return state
    case 'SET_VIEW':
      updatedState = {
        ...state,
        view: action.payload
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'UPDATE_SEARCH':
      return {
        ...state,
        search: action.payload
      }
    case 'TOGGLE_FILTER':
      return {
        ...state,
        filters: state.filters.includes(action.payload)
          ? state.filters.filter(saved => saved !== action.payload)
          : [...state.filters, action.payload]
      }
    case 'RESET_SEARCH':
      console.log('test')
      updatedState = {
        ...state,
        search: '',
        filters: [],
      }
      return updatedState
    case 'TOGGLE_ZIP_FOLDER':
      if (!action.payload.slug) {
        throw Error('No slug provided')
      }
      if (!action.payload.files) {
        throw Error('No files provided')
      }
      updatedState = {
        ...state,
        zips: {
          ...state.zips,
          [action.payload.slug]: action.payload.files,
        }
      }
      if (state.zips.hasOwnProperty(action.payload.slug)) {
        delete updatedState.zips[action.payload.slug]
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'TOGGLE_ZIP_ITEM':
      slug = action.payload.slug
      file = action.payload.files
      if (state.zips.hasOwnProperty(slug)) {
        const hasFile = state.zips[slug].includes(file)    
        updatedState = {
          ...state,
          zips: {
            ...state.zips,
            [slug]: hasFile 
              ? state.zips[slug].filter(f => f !== file)
              : [...state.zips[slug], file]
          }
        }
        if (updatedState.zips[slug].length === 0)
          delete updatedState.zips[slug]
      } else {
        updatedState = {
          ...state,
          zips: {
            ...state.zips,
            [slug]: [file]
          }
        }
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'SET_CURRENT':
      updatedState = {
        ...state,
        current: action.payload
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'CLEAR_ZIP':
      updatedState = {
        ...state,
        zips: {},
      }
      updateLocalStorage(updatedState)
      return updatedState
    default:
      return state
  }
}