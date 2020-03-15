import React from 'react'
import {
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from 'react-icons/md'

import AppContext from '../../context'

export default (props) => {
  return (
    <AppContext.Consumer>
      {({state, dispatch}) => {
        const Icon = state.cart.includes(props.slug) 
          ? MdRemoveShoppingCart
          : MdAddShoppingCart
        return (
          <div onClick={() => dispatch({
            type: 'TOGGLE_CART_ITEM',
            payload: props.slug,
          })}>
            <Icon
              {...props}
              className={`cart-button ${props.className}`}
            />
            {props.text}
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

