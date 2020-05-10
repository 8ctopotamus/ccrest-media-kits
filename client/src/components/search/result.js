import React from 'react'
import { MdPageview } from 'react-icons/md'
import AppContext from '../../context'
import CartButton from '../zip/toggle-button'

export default ({ item }) => {
  const {
    post_title,
    post_name,
    files,
  } = item
  return (
    <AppContext.Consumer>
      {({ state, dispatch }) => {
        const fileCount = files.length
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
            </div>
            <div className="actions">
              <span style={{
                marginRight: 'auto',
              }}>
                {fileCount} file{fileCount === 1 ? null : 's'}
              </span>
              <div className="hover-icon">
                <MdPageview onClick={launchDetailView} size="25" />
              </div>
              <CartButton slug={post_name} files={files} size="25" />
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}