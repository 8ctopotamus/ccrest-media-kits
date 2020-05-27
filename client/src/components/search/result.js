import React from 'react'
import styled from 'styled-components'
import AppContext from '../../context'
import LazyImage from '../lazy-image'

const Result = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  height: 100%;
  box-shadow: 1px 1px 9px rgba(0,0,0,.15);
  cursor: pointer;
  h6 {
    margin: 0;
  }
  .actions,
  .result-inner {
    padding: 15px;
  }
  .result-preview {
    height: 300px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      opacity: .85;
    }
  }
`

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
          <Result onClick={launchDetailView}>
            <LazyImage imageURL={featuredImage} height="300px" />
            <div className="result-inner">
              <h6>{post_title}</h6>
            </div>
          </Result>
        )
      }}
    </AppContext.Consumer>
  )
}