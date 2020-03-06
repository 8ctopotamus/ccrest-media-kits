import React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import AppContext from '../../context'

export default () => (
  <AppContext.Consumer>
    {({state}) => (
      <>
        <MdShoppingCart size="25" /> {state.cart.length}
      </>
    )}
  </AppContext.Consumer>
)