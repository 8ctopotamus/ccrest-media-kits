import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const Preview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height ? props.height : '300px'};
  width: ${props => props.width ? props.width : '100%'};;
  cursor: pointer;
  &:hover {
    opacity: .85;
  }
`

export default ({ imageURL, onClick, height, width }) => {
  const [ready, setReady] = useState(false)
  return (
    <Preview onClick={onClick} height={height} width={width}>     
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
        style={{ display: ready ? 'block': 'none' }}
      />
    </Preview>
  )
}