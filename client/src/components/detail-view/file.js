import React from 'react'
import { MdCloudDownload } from 'react-icons/md'
import CartButton from '../cart-button'

export default ({ file }) => {
  const {
    alt,
    description,
    filesize,
    icon, 
    ID,
    height,
    subtype,
    title,
    type,
    url,
    width,
  } = file
  
  const image = type === 'image' ? url : icon

  return (
    <div className="grid gap col-1-2">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={image} alt={alt} key={ID} />
      </div>
      <div>
        <h3>{title} <small>({subtype})</small></h3>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 30 }}>
            <CartButton slug={url} size="25" />
            <a href={url} download title="Download file">
              <MdCloudDownload size="25" color="black" />
            </a>
          </div>
          <div>
            <p>{description}</p>
            <ul>
              <li>{width} &times; {height}px</li>
              <li>{filesize}KB</li>
            </ul>
          </div>
        </div>        
      </div>
    </div>
  )
}