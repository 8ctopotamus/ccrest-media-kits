import React from 'react'
import { MdCloudDownload } from 'react-icons/md'
import CartButton from '../cart-button'

export default ({ slug, file }) => {
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
    <div className="grid gap col-1-2 file">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={image} alt={alt} key={ID} />
      </div>
      <div>
        <h3>{title} <small>({subtype})</small></h3>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 30 }}>
            <CartButton
              slug={slug}
              file={url}
              size="45"
              type="TOGGLE_CART_ITEM"
            />
            <a
              href={url}
              className="hover-icon"
              title="Download file"
              download
            >
              <MdCloudDownload size="45" color="black" />
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