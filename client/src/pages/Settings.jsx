import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [userData, setUserData] = useState(null) // State to hold decoded user data

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      })

      console.log('Login successful:', response.data)
      setMessage('Login successful!') // Update message for the user

      // Optionally, save the token to localStorage
      localStorage.setItem('token', response.data.token)
      console.log(decoded)
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error) // Set server error message
        console.error('Error:', error.response.data.error)
      } else {
        setMessage('An error occurred. Please try again.') // Handle other errors
        console.error('Error:', error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
      {userData && (
        <div>
          <h3>User Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>{' '}
          {/* Display the decoded user data */}
        </div>
      )}
    </form>
  )
}

export default Login
