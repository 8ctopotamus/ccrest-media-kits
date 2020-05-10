import React from 'react'
import { MdClose, MdShoppingCart } from 'react-icons/md'
import AppContext from '../../context'

export default () => (
  <AppContext.Consumer>
      {({state, dispatch}) => {
        const isCartView = state.view === 'CART'
        const targetView = isCartView
          ? null
          : 'CART'
        const cartAmt = Object.values(state.cart)
          .reduce((prev, curr) => (prev + curr.length), 0)
        return (
          <div className="topbar">
            <div
              className="cart-count" 
              onClick={() => dispatch({
                type: 'SET_VIEW',
                payload: targetView
              })}
            >
              {isCartView
                ? (
                  <>  
                    <span>Keep browsing</span>
                    <MdClose size="25" /> 
                  </>
                ) : (
                  <>
                    <MdShoppingCart size="25" /> 
                    <span>{cartAmt}</span>
                  </>
                )}
            </div>
          </div>
        )
      }}
  </AppContext.Consumer>
)