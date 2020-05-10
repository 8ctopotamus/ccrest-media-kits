import { LS_KEY } from './index'

const updateLocalStorage = state => {
  if (window && window.localStorage) {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }
}

export default (state, action) => {
  let updatedState
  let slug
  let file
  switch(action.type) {
    case 'GET_LOCALSTORAGE':
      if (window && window.localStorage && localStorage.getItem(LS_KEY)) {
        return JSON.parse(localStorage.getItem(LS_KEY))
      }
      return state
    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload
      }
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
    case 'TOGGLE_CART_PACK':
      if (!action.payload.slug) {
        throw Error('No slug provided')
      }
      if (!action.payload.files) {
        throw Error('No files provided')
      }
      updatedState = {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.slug]: action.payload.files,
        }
      }
      if (state.cart.hasOwnProperty(action.payload.slug)) {
        delete updatedState.cart[action.payload.slug]
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'TOGGLE_CART_ITEM':
      console.log(action.payload)
      slug = action.payload.slug
      file = action.payload.files
      if (state.cart.hasOwnProperty(slug)) {
        const hasFile = state.cart[slug].includes(file)    
        updatedState = {
          ...state,
          cart: {
            ...state.cart,
            [slug]: hasFile 
              ? state.cart[slug].filter(f => f !== file)
              : [...state.cart[slug], file]
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
    case 'CLEAR_CART':
      updatedState = {
        ...state,
        cart: {},
      }
      updateLocalStorage(updatedState)
      return updatedState
    default:
      return state
  }
}