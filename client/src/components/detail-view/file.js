import React from 'react'
import CartButton from '../cart-button'

export default ({ file }) => {
  const image = file.type === 'image'
    ? file.url
    : file.icon
  return (
    <div className="grid gap col-1-2">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={image} alt={file.alt} key={file.ID} />
      </div>
      <div>
        <h3>{file.title}</h3>
        <CartButton slug={file.url} size="25" />
        <p>{file.description}</p>
        <ul>
          <li>{file.width} &times; {file.height}px</li>
          <li>{file.filesize}KB</li>
          <li>{file.mime_type}</li>
          <li>{file.icon}</li>
          <li>{file.filesize}</li>
        </ul>
      </div>
    </div>
  )
}