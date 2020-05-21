import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import qs from 'qs'
import { MdClose } from 'react-icons/md'
import { Animated } from 'react-animated-css'
import Preview from '../lazy-image'

const wp_data = window.wp_data 
    ? window.wp_data
    : null

const { admin_ajax_url, user } = wp_data

const defaultEmail = (Object.keys(user).length !== 0 && user.constructor === Object)
  ? user.user_email
  : ''

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Thumb = styled.div`
  position: relative;
  background: white;
  width: 150px;
  height: 150px;
  margin: 15px;
`

const RemoveButton = styled.button`
  background: 'blue';
  border-radius: 100%;
  border: 1px solid red;
  padding: 10px;
  position: absolute;
  top: -15px;
  right: -15px;
  svg {
    fill: red;
  }
  &:hover {
    background: red;
  }
  &:hover svg {
    fill: blue;
  }
`

export default ({ toZip, dispatch }) => {
  const [email, setEmail] = useState(defaultEmail)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    let params = {
      action: 'cc_actions',
      do: 'GENERATE_ZIP',
      email,
      toZip,
    }
    params = qs.stringify(params)
    const response = await axios.post(admin_ajax_url, params)
    console.log(response)
    let msg = `Success! We are emailing you your download link. You can also <a href="${response.data}" download>download your media now</a>. Your download link will expire after 7 days.`
    if (response.state === 500) {
      msg = 'Error creating ZIP'
    }
    setMessage(msg)
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
        <form onSubmit={handleSubmit} className="email-downloads-form">
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

      { message && <p dangerouslySetInnerHTML={{__html: message}} />}
      
      { Object.entries(toZip).length > 0 ? Object.entries(toZip).map(folder => {
        const [key, val] = folder
        return (
          <section key={key}>
            <h3 style={{marginTop: 60}}>{key}</h3>
            <Flex key={key}>
              {val.map(file => (
                <Thumb className="thumb" key={file} backgroundImage={file}>
                  <RemoveButton
                    className="remove-button"
                    onClick={() => dispatch({
                      type: 'TOGGLE_ZIP_ITEM',
                      payload: {
                        slug: key,
                        files: file
                      },
                    })}
                  >
                    <MdClose />
                  </RemoveButton>
                  <Preview
                    imageURL={file}
                    height="150px"
                    width="150px"
                    background="white" 
                  />
                </Thumb>
              ))}
            </Flex>
          </section>
        )
      }) : (
        <p style={{marginTop: 50}}>Looks like you need to add some files to your download.</p>
      )}
    </Animated>
  )
}