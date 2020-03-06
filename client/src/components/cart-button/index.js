import React from 'react'
// import PropTypes from 'prop-types'
import {
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from 'react-icons/md'
import AppContext from '../../context'

export default (props) => {
  return (
    <AppContext.Consumer>
      {({state, dispatch}) => {
        const ButtonComponent = state.cart.includes(props.slug) 
          ? MdRemoveShoppingCart
          : MdAddShoppingCart
        return (
          <ButtonComponent
            {...props}
            onClick={() => dispatch({
              type: 'TOGGLE_CART_ITEM',
              payload: props.slug,
            })}
          />
        )
      }}
    </AppContext.Consumer>
  )
}

