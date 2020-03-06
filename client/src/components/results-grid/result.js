import React from 'react'
import { MdCloudDownload, MdPageview } from 'react-icons/md'
import CartButton from '../cart-button'

export default ({
  featured_image,
  post_title,
  post_name,
}) => (
  <div className="result">
    <img src={featured_image} alt={post_title} />
    <div className="result-inner">
      <h6>{post_title}</h6>
      <div className="actions">
        <MdCloudDownload size="25" />
        <MdPageview size="25" />
        <CartButton slug={post_name} size="25" />
      </div>
    </div>
  </div>
)