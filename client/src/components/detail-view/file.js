import React from 'react'

export default ({ file }) => (
  <img src={file.url} alt={file.alt} key={file.ID} />
)