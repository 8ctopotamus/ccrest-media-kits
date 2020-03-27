import React from 'react'
import PropTypes from 'prop-types'
import {
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from 'react-icons/md'

import AppContext from '../../context'

const CartButton = (props) => {
  return (
    <AppContext.Consumer>
      {({state, dispatch}) => {
        const Icon = state.cart.hasOwnProperty(props.slug) 
          ? MdRemoveShoppingCart
          : MdAddShoppingCart
        return (
          <div 
            className="cart-button"
            onClick={() => dispatch({
              type: 'TOGGLE_CART_ITEM',
              payload: {
                slug: props.slug,
                files: props.files.map(file => file.url),
              }
            })}
          >
            <Icon size={props.size} color={props.color} className={props.className} />
            {props.text}
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default CartButton

CartButton.protoTypes = {
  slug: PropTypes.string,
  files: PropTypes.array,
}

