import { LS_KEY } from './index'

const updateLocalStorage = state => {
  if (window && window.localStorage) {
    localStorage.setItem(LS_KEY, JSON.stringify(state))
  }
}

export default (state, action) => {
  let updatedState
  switch(action.type) {
    case 'GET_LOCALSTORAGE':
      if (window && window.localStorage && localStorage.getItem(LS_KEY)) {
        return JSON.parse(localStorage.getItem(LS_KEY))
      }
      return state
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
    case 'TOGGLE_CART_ITEM':
      updatedState = {
        ...state,
        cart: state.cart.includes(action.payload)
          ? state.cart.filter(saved => saved !== action.payload)
          : [...state.cart, action.payload]
      }
      updateLocalStorage(updatedState)
      return updatedState
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload
      }
    default:
      return state
  }
}