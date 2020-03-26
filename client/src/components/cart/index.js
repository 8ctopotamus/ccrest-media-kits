import React, { useState } from 'react'
import axios from 'axios'
import { Animated } from 'react-animated-css'

const { admin_ajax_url, user } = wp_data

const defaultEmail = user
  ? user.user_email
  : ''

export default ({ items, dispatch }) => {
  const [email, setEmail] = useState(defaultEmail)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const response = await axios.post(admin_ajax_url, {
      action: 'cc_actions',
      do: 'CART_SUBMIT',
      email,
      items,
    })
    console.log(response)
    setLoading(false)
  }

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
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </Animated>
  )
}