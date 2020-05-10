import React from 'react'
import PropTypes from 'prop-types'
import {
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from 'react-icons/md'

import AppContext from '../../context'

const CartButton = ({
  color,
  className,
  file,
  files,
  size,
  slug,
  style,
  text,
  type,
}) => (
  <AppContext.Consumer>
    {({state, dispatch}) => {
      const Icon = state.cart.hasOwnProperty(slug) 
        ? MdRemoveShoppingCart
        : MdAddShoppingCart

      const handleClick = () => {
        if (type === 'TOGGLE_CART_ITEM') {
          dispatch({
            type: 'TOGGLE_CART_ITEM',
            payload: {
              slug: slug,
              files: file,
            }
          })
          return
        }
        dispatch({
          type: 'TOGGLE_CART_PACK',
          payload: {
            slug: slug,
            files: files.map(file => file.url),
          }
        })
      }

      return (
        <div 
          className="cart-button"
          onClick={handleClick}
          style={style}
        >
          <Icon size={size} color={color} className={className} />
          {text}
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default CartButton

CartButton.protoTypes = {
  slug: PropTypes.string,
  files: PropTypes.array,
}

