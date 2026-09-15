import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from './axiosConfig'
import './MyBookings.css'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)

  const email = localStorage.getItem('userEmail')

  const fetchBookings = () => {
    api.get('/api/bookings')
      .then(response => {
        setBookings(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('BOOKING FETCH ERROR:', error)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const openCancelPopup = (booking) => {
    setSelectedBooking(booking)
    setPassword('')
    setError('')
  }

  const closeCancelPopup = () => {
    setSelectedBooking(null)
    setPassword('')
    setError('')
  }

  const cancelBooking = async () => {
    if (!password.trim()) {
      setError('Please enter your password')
      return
    }

    setCancelling(true)
    setError('')

    try {
      const verifyResponse = await api.post('/api/users/verify-password', {
        email: email,
        password: password
      })

      if (!verifyResponse.data.success) {
        setError('Incorrect password')
        setCancelling(false)
        return
      }

      await api.delete(`/api/bookings/${selectedBooking.id}`)

      closeCancelPopup()
      fetchBookings()

      alert('Booking cancelled successfully!')
    } catch (error) {
      console.error('CANCEL BOOKING ERROR:', error)
      setError('Unable to cancel booking. Please try again.')
    }

    setCancelling(false)
  }

  return (
    <div className="bookings-page">

      <nav className="bookings-navbar">
        <Link to="/" className="booking-logo">
          <span>Stay</span>Easy
        </Link>

        <div>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
        </div>
      </nav>

      <div className="bookings-content">

        <h1>My Bookings</h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="no-bookings">
            <h2>No Bookings Yet</h2>
            <p>You haven't booked any hotels yet.</p>

            <Link to="/hotels" className="browse-btn">
              Browse Hotels
            </Link>
          </div>
        ) : (
          <div className="booking-list">

            {bookings.map(booking => (
              <div className="booking-card" key={booking.id}>

                <h2>
                  {booking.hotel?.name || 'Hotel'}
                </h2>

                <p>
                  📍 {booking.hotel?.city || booking.hotel?.location || 'Location'}
                </p>

                <p>
                  🛏️ Room: {booking.room?.roomType || 'Room'}
                </p>

                <p>
                  📅 Check-in: {booking.checkInDate}
                </p>

                <p>
                  📅 Check-out: {booking.checkOutDate}
                </p>

                <p>
                  💰 Total: ₹{booking.totalPrice}
                </p>

                <button
                  className="cancel-booking-btn"
                  onClick={() => openCancelPopup(booking)}
                >
                  Cancel Booking
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {selectedBooking && (
        <div className="cancel-overlay">

          <div className="cancel-popup">

            <h2>Cancel Booking</h2>

            <p>
              Enter your password to cancel this booking.
            </p>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="cancel-error">
                {error}
              </p>
            )}

            <div className="cancel-actions">

              <button
                className="cancel-close-btn"
                onClick={closeCancelPopup}
              >
                Keep Booking
              </button>

              <button
                className="confirm-cancel-btn"
                onClick={cancelBooking}
                disabled={cancelling}
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancel'}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default MyBookings