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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`

const Thumb = styled.div`
  
`

export default ({ zips, dispatch }) => {
  const [email, setEmail] = useState(defaultEmail)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    let params = {
      action: 'cc_actions',
      do: 'ZIP_SUBMIT',
      email,
      zips,
    }
    params = qs.stringify(params)
    const response = await axios.post(admin_ajax_url, params)
    console.log(response.data)
    setLoading(false)
  }

  return (
    <Animated 
      animationIn="fadeIn"
      className="container zips-view"
    >
      <h2>My Downloads</h2>
      <p>Enter your email so we can send you a download link!</p>
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
            onClick={() => dispatch({type: 'CLEAR_ZIP'})}
            type="button"
            style={{background: 'red', color: 'white'}}
          >CLEAR ALL</button>
        </form>  
      ) : (
        <p style={{color: 'red'}}>Error. No admin_ajax_url.</p>
      ) }
      
      { Object.entries(zips).length > 0 ? Object.entries(zips).map(folder => {
        const [key, val] = folder
        console.log(folder)
        return (
          <div key={key}>
            <h3>{key}</h3>
            <Grid>
              {val.map(file => (
                <li style={{display:'flex', justifyContent: 'space-between'}} key={file}>
                  <span>{file}</span>
                  <MdClose onClick={() => dispatch({
                    type: 'TOGGLE_ZIP_ITEM',
                    payload: {
                      slug: key,
                      files: file
                    },
                  })} />
                </li>
              ))}
            </Grid>
          </div>
        )
      }) : (
        <p style={{marginTop: 50}}>Looks like you need to add some files to your download.</p>
      )}
    </Animated>
  )
}