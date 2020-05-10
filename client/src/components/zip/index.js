import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import qs from 'qs'
import { MdClose } from 'react-icons/md'
import { Animated } from 'react-animated-css'

const wp_data = window.wp_data 
    ? window.wp_data
    : null

const { admin_ajax_url, user } = wp_data

const defaultEmail = (Object.keys(user).length !== 0 && user.constructor === Object)
  ? user.user_email
  : ''

export default ({ cart, dispatch }) => {
  const [email, setEmail] = useState(defaultEmail)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    let params = {
      action: 'cc_actions',
      do: 'CART_SUBMIT',
      email,
      cart,
    }
    params = qs.stringify(params)
    const response = await axios.post(admin_ajax_url, params)
    console.log(response.data)
    setLoading(false)
  }

  console.log(cart)

  return (
    <Animated 
      animationIn="fadeIn"
      className="container cart-view"
    >
      <h2>My Cart</h2>
      {wp_data && admin_ajax_url ? (
        <form onSubmit={handleSubmit} className="grid col-2-1-1">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="cool_employee@thebestcompany.com" 
              value={email}
            />
          </div>
          <button
            type="submit"
            disabled={!email.includes('@')}
          >
            {loading ? 'SENDING...' : 'SEND'}
          </button>
          <button
            onClick={() => dispatch({type: 'CLEAR_CART'})}
            type="button"
          >CLEAR CART</button>
        </form>  
      ) : (
        <p style={{color: 'red'}}>Error. No admin_ajax_url.</p>
      ) }
      
      { Object.entries(cart).length > 0 ? Object.entries(cart).map(folder => {
        const [key, val] = folder
        console.log(folder)
        return (
          <div key={key}>
            <h3>{key}</h3>
            {val.map(file => (
              <li style={{display:'flex', justifyContent: 'space-between'}} key={file}>
                <span>{file}</span>
                <MdClose onClick={() => dispatch({
                  type: 'TOGGLE_CART_ITEM',
                  payload: {
                    slug: key,
                    files: file
                  },
                })} />
              </li>
            ))}
          </div>
        )
      }) : (
        <p style={{marginTop: 50}}>Looks like you need to add some kits to your cart.</p>
      )}
    </Animated>
  )
}