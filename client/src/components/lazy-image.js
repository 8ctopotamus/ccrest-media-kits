import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

  // width: 200px;
  // height: 150px;

// &:hover {
//   opacity: .85;
// }
const LazyImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 0;
  height: ${props => props.height ? props.height : '100%'};
  width: ${props => props.width ? props.width : '100%'};
  & > img {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    min-height: 100%;
    max-width: 100%;
    transform: translate(-50%, -50%);
  }
`
  // height: ${props => props.height ? props.height : '100%'};
  // width: ${props => props.width ? props.width : '100%'};

export default ({ imageURL, onClick, height, width }) => {
  const [ready, setReady] = useState(false)
  return (
    <LazyImage onClick={onClick} height={height} width={width}>     
      {!ready && (
        <ReactPlaceholder
          showLoadingAnimation={true}
          type='rect'
          style={{width: '100%', height: '100%', marginRight: 0}}
        />
      )}
      <img 
        onLoad={() => setReady(true)}
        src={imageURL}
        alt={imageURL}
        style={{ display: ready ? 'block': 'none',  }}
      />
    </LazyImage>
  )
}