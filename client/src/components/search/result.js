import React from 'react'
import styled from 'styled-components'
import AppContext from '../../context'
import Preview from '../lazy-image'

export default ({ item }) => {
  const { post_title, files } = item
  return (
    <AppContext.Consumer>
      {({ dispatch }) => {
        const fileCount = files.length
        const firstFile = (fileCount > 0) && files[0]
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
            <Preview imageURL={featuredImage} onClick={launchDetailView} />
            <div className="result-inner">
              <h6>{post_title}</h6>
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}