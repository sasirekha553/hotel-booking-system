import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {
  const [isRegister, setIsRegister] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (isRegister) {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      await axios.post('http://localhost:8080/api/users/register', {
        name: name,
        email: email,
        password: password
      })

      alert('Registration successful! Please login.')

      setIsRegister(false)
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }

  } else {

  if (!email || !password) {
  alert('Please enter email and password')
  return
}

try {
  
   const response = await axios.post(
  'http://localhost:8080/api/users/login',
  {
    email: email,
    password: password
  }
)

localStorage.setItem('token', response.data.token)


alert('Login successful!')


  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', email)
  navigate('/')

} catch (error) {
  console.error('Login error:', error)
  alert('Invalid email or password')
}  
  }
}

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <span>Stay</span>Easy
        </div>

        <h1>
          {isRegister ? 'Create Account' : 'Welcome Back'}
        </h1>

        <p className="login-subtitle">
          {isRegister
            ? 'Create your StayEasy account'
            : 'Login to continue your journey'}
        </p>

        <form onSubmit={handleSubmit}>

          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>
          )}

          <button type="submit" className="login-btn">
            {isRegister ? 'Register' : 'Login'}
          </button>

        </form>

        <div className="switch-login">

          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
              >
                Register
              </button>
            </p>
          )}

        </div>

      </div>

    </div>
  )
}

export default Login