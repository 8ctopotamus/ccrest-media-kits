import React, { useState } from 'react'
import styled from 'styled-components'
import { MdCloudDownload } from 'react-icons/md'
import CartButton from '../cart/toggle-button'
import Preview from '../lazy-image'

const File = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  height: 100%;
  box-shadow: 1px 1px 9px rgba(0,0,0,.15);
  margin-bottom: 30px;
`

const PreviewContainer = styled.div`
  height: 300px;
  width: 100%;
  &:hover {
    opacity: .9;
  }
`

const Details = styled.div`
  background: rgba(0,0,0,.5);
  color: white;
  padding: 10px;
  height: 100%;
`

const Heading = styled.h6`
  padding: 15px;
`

const Actions = styled.div`
  margin-top: auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  & > * { margin-right: 10px;}
  svg { cursor: pointer; }
`

export default ({ slug, file }) => {
  const {
    description,
    filesize,
    icon,
    height,
    subtype,
    title,
    type,
    url,
    width,
  } = file

  const [showDetails, setShowDetails] = useState(false)
  
  const image = type === 'image' ? url : icon

  return (
    <File className="file">
      <PreviewContainer >
        {!showDetails ? (
          <Preview imageURL={image} onClick={() => setShowDetails(!showDetails)} />
        ) : (
          <Details onClick={() => setShowDetails(!showDetails)}>
            <h3>{title}</h3>
            <p>{description}</p>
            <ul>
              <li>{width} &times; {height}px</li>
              <li>{filesize}KB</li>
            </ul>
          </Details>
        )}
      </PreviewContainer>

      <Heading>
        {title} <small>({subtype})</small>
      </Heading>

      <Actions>
        <a
          href={url}
          className="hover-icon"
          title="Download file"
          download
        >
          <MdCloudDownload size="25" color="black" style={{marginRight: 10}} />
          Download File
        </a>
        <CartButton
          slug={slug}
          file={url}
          size="25"
          type="TOGGLE_ZIP_ITEM"
          text="Add File"
          alternativeText="Remove File"
        />
      </Actions>
    </File>
  )
}