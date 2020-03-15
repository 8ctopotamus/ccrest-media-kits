import React from 'react'
import { MdCloudDownload, MdPageview } from 'react-icons/md'
import AppContext from '../../context'
import CartButton from '../cart-button'

export default ({ item }) => {
  const {
    post_title,
    post_name,
    files
  } = item
  return (
    <AppContext.Consumer>
      {({ state, dispatch }) => {
        const firstFile = files[0]
        const isImage = firstFile.type === 'image'
        const featuredImage = isImage
          ? firstFile.url
          : firstFile.icon

        const launchDetailView = () => dispatch({
          type: 'SET_CURRENT',
          payload: item,
        })

        return (
          <div className="result">
            <div
              className="result-preview" 
              onClick={launchDetailView}
              style={{
                backgroundImage: `url(${featuredImage})`,
                backgroundSize: isImage ? 'cover': 'auto',
              }}
            />
            <div className="result-inner">
              <h6>{post_title}</h6>
              <div className="actions">
                <MdCloudDownload size="25" />
                <MdPageview onClick={launchDetailView} size="25" />
                <CartButton slug={post_name} size="25" />
              </div>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}