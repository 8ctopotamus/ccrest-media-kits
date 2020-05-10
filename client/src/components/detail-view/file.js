import React, { useState } from 'react'
import styled from 'styled-components'
import { MdCloudDownload } from 'react-icons/md'
import CartButton from '../zip/toggle-button'

const File = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  height: 100%;
  box-shadow: 1px 1px 9px rgba(0,0,0,.15);
`

const Preview = styled.div`
  height: 300px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  background-image: ${props => props.image ? `url(${props.image})`: 'none'};
  background-size: cover;
  &:hover {
    opacity: .85;
  }
`

const Details = styled.div`
  background: rgba(0,0,0,.5);
  color: white;
  padding: 10px;
`

const Heading = styled.h6`
  padding-left: 15px;
`

const Actions = styled.div`
  margin-top: auto;
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
    <File>
      <Preview
        onClick={() => setShowDetails(!showDetails)}
        image={image}
        className="result-preview"
      >
        {showDetails && (
          <Details>
            <p>{description}</p>
            <ul>
              <li>{width} &times; {height}px</li>
              <li>{filesize}KB</li>
            </ul>
          </Details>
        )}
      </Preview>
      <div className="result-inner">
        <Heading>{title} <small>({subtype})</small></Heading>
      </div>
      <Actions>
        <a
          href={url}
          className="hover-icon"
          title="Download file"
          download
        >
          <MdCloudDownload size="25" color="black" />
          Download
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