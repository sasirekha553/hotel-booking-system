import { useEffect, useState } from 'react'
import axios from 'axios'
import './Profile.css'

function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const email = localStorage.getItem('userEmail')

    if (email) {
      axios
        .get(`http://localhost:8080/api/users/${email}`)
        .then(response => {
          setUser(response.data)
        })
        .catch(error => {
          console.error('Error fetching profile:', error)
        })
    }
  }, [])

  if (!user) {
    return <div className="profile-loading">Loading profile...</div>
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-icon">👤</div>

        <h1>My Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Name</strong>
            <span>{user.name}</span>
          </p>

          <p>
            <strong>Email</strong>
            <span>{user.email}</span>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Profile