import React from 'react'
import { MdCloudDownload, MdPageview } from 'react-icons/md'
import AppContext from '../../context'
import CartButton from '../cart-button'

export default ({ item }) => {
  const {
    featured_image,
    post_title,
    post_name,
  } = item
  return (
    <div className="result">
      <img src={featured_image} alt={post_title} />
      <div className="result-inner">
        <h6>{post_title}</h6>
        <div className="actions">
          <MdCloudDownload size="25" />
          <AppContext.Consumer>
            {({state, dispatch}) => (
              <MdPageview 
                size="25" 
                onClick={() => dispatch({
                  type: 'SET_CURRENT',
                  payload: item,
                })} 
              />
            )}
          </AppContext.Consumer>
          <CartButton slug={post_name} size="25" />
        </div>
      </div>
    </div>
  )
}