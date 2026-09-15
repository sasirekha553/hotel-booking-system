import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../axiosConfig'
import axios from 'axios'
import './HotelDetails.css'

function HotelDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [hotel, setHotel] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')


  useEffect(() => {

    setLoading(true)

    axios.get(`http://localhost:8080/api/hotels`)
      .then(response => {

        const selectedHotel = response.data.find(
          item => Number(item.id) === Number(id)
        )

        if (selectedHotel) {
          setHotel(selectedHotel)
        } else {

          setHotel({
            id: Number(id),
            name: 'Hotel',
            location: 'Available Location',
            city: 'Available Location',
            rating: 4.5,
            image:
              'https://images.unsplash.com/photo-1566073771259-6a8506099945',
            description:
              'Comfortable stay with excellent facilities.'
          })

        }

      })
      .catch(error => {

        console.error('Error fetching hotel:', error)

        setHotel({
          id: Number(id),
          name: 'Hotel',
          location: 'Available Location',
          city: 'Available Location',
          rating: 4.5,
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          description:
            'Comfortable stay with excellent facilities.'
        })

      })


    axios.get(`http://localhost:8080/api/rooms/hotel/${id}`)
      .then(response => {

        setRooms(response.data)

      })
      .catch(error => {

        console.error('Error fetching rooms:', error)
        setRooms([])

      })
      .finally(() => {

        setLoading(false)

      })

  }, [id])


  const handleRoomBooking = (room) => {

    const isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true'

    if (!isLoggedIn) {

      navigate('/login')
      return

    }

    setSelectedRoom(room)
    setShowBookingForm(true)

  }


  const handleBookingSubmit = (e) => {

    e.preventDefault()

    if (!selectedRoom) {
      alert('Please select a room')
      return
    }


    const payload = {

      customerName: customerName,

      customerEmail: customerEmail,

      checkInDate: checkInDate,

      checkOutDate: checkOutDate,

      totalPrice: selectedRoom.price,

      hotel: {
        id: Number(id)
      },

      room: {
        id: selectedRoom.id
      }

    }


    console.log(
      'ROOM BOOKING PAYLOAD:',
      payload
    )

    api.post(
  '/api/bookings',
      payload
    )

      .then(response => {

        alert('Booking successful!')

        setShowBookingForm(false)

        setCustomerName('')
        setCustomerEmail('')
        setCheckInDate('')
        setCheckOutDate('')
        setPaymentMethod('')

        return axios.get(
          `http://localhost:8080/api/rooms/hotel/${id}`
        )

      })

      .then(response => {

        if (response) {
          setRooms(response.data)
        }

      })

      .catch(error => {

        console.error(
          'Booking error:',
          error
        )

        alert('Booking failed!')

      })

  }


  if (loading) {

    return (
      <div className="hotel-details">
        <h2>Loading rooms...</h2>
      </div>
    )

  }


  return (

    <div className="hotel-details">

      <nav className="hotels-navbar">

        <Link
          to="/"
          className="hotels-logo"
        >
          <span>Stay</span>Easy
        </Link>


        <div className="hotels-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/hotels">
            Hotels
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* HOTEL INFORMATION */}

      <img
        className="hotel-details-image"
        src={hotel?.image}
        alt={hotel?.name}
      />


      <div className="hotel-info">

        <h1>
          {hotel?.name}
        </h1>


        <p>
          📍 {hotel?.location}
        </p>


        <p>
          ⭐ {hotel?.rating}
        </p>


        <p>
          {hotel?.description ||
            'Comfortable stay with excellent facilities.'}
        </p>


        <h2>
          Available Rooms
        </h2>


        {rooms.length === 0 ? (

          <p>
            No rooms available.
          </p>

        ) : (

          <div className="rooms-container">

            {rooms.map(room => (

              <div
                className="room-card"
                key={room.id}
              >

                <img
                  src={room.image}
                  alt={room.roomType}
                />


                <div className="room-info">

                  <h3>
                    {room.roomType}
                  </h3>


                  <p>
                    🛏️ Comfortable Room
                  </p>


                  <p>
                    💰 ₹
                    {Number(room.price).toLocaleString()}
                    {' '} / night
                  </p>


                  <p>
                    🏨 Available Rooms:{' '}
                    <strong>
                      {room.availableRooms}
                    </strong>
                  </p>


                  {room.availableRooms > 0 ? (

                    <button
                      onClick={() =>
                        handleRoomBooking(room)
                      }
                    >
                      Book Now
                    </button>

                  ) : (

                    <button disabled>
                      Sold Out
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* BOOKING FORM */}

      {showBookingForm &&
        selectedRoom && (

          <div className="booking-overlay">

            <div className="booking-form">

              <button
                className="close-booking"
                onClick={() =>
                  setShowBookingForm(false)
                }
              >
                ✕
              </button>


              <div className="booking-header">

                <span className="booking-crown">
                  ✦
                </span>

                <h2>
                  Complete Your Booking
                </h2>

                <p>
                  Reserve your perfect stay
                </p>

              </div>


              <div className="selected-room-box">

                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.roomType}
                />


                <div>

                  <h3>
                    {hotel?.name}
                  </h3>

                  <p>
                    🛏️ {selectedRoom.roomType}
                  </p>

                  <strong>
                    ₹
                    {Number(
                      selectedRoom.price
                    ).toLocaleString()}
                    {' '} / night
                  </strong>

                </div>

              </div>


              <form
                onSubmit={handleBookingSubmit}
              >

                {/* GUEST DETAILS */}

                <div className="form-section">

                  <h3>
                    Guest Details
                  </h3>


                  <div className="input-row">

                    <input
                      type="text"
                      placeholder="Full Name"
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(
                          e.target.value
                        )
                      }
                      required
                    />


                    <input
                      type="email"
                      placeholder="Email Address"
                      value={customerEmail}
                      onChange={(e) =>
                        setCustomerEmail(
                          e.target.value
                        )
                      }
                      required
                    />

                  </div>

                </div>


                {/* STAY DETAILS */}

                <div className="form-section">

                  <h3>
                    Stay Details
                  </h3>


                  <div className="input-row">

                    <div className="date-field">

                      <label>
                        Check-in
                      </label>

                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) =>
                          setCheckInDate(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>


                    <div className="date-field">

                      <label>
                        Check-out
                      </label>

                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) =>
                          setCheckOutDate(
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>

                </div>


                {/* PAYMENT */}

                <div className="form-section">

                  <h3>
                    Choose Payment Method
                  </h3>


                  <div className="payment-options">

                    <label
                      className={`payment-card ${
                        paymentMethod === 'GPay'
                          ? 'selected'
                          : ''
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="GPay"
                        checked={
                          paymentMethod === 'GPay'
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                        required
                      />

                      <span className="payment-icon">
                        G
                      </span>

                      <span>
                        GPay
                      </span>

                    </label>


                    <label
                      className={`payment-card ${
                        paymentMethod === 'PhonePe'
                          ? 'selected'
                          : ''
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="PhonePe"
                        checked={
                          paymentMethod === 'PhonePe'
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span className="payment-icon">
                        पे
                      </span>

                      <span>
                        PhonePe
                      </span>

                    </label>


                    <label
                      className={`payment-card ${
                        paymentMethod === 'Credit Card'
                          ? 'selected'
                          : ''
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Credit Card"
                        checked={
                          paymentMethod === 'Credit Card'
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span className="payment-icon">
                        💳
                      </span>

                      <span>
                        Credit Card
                      </span>

                    </label>


                    <label
                      className={`payment-card ${
                        paymentMethod === 'Debit Card'
                          ? 'selected'
                          : ''
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Debit Card"
                        checked={
                          paymentMethod === 'Debit Card'
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span className="payment-icon">
                        💳
                      </span>

                      <span>
                        Debit Card
                      </span>

                    </label>


                    <label
                      className={`payment-card ${
                        paymentMethod === 'Net Banking'
                          ? 'selected'
                          : ''
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Net Banking"
                        checked={
                          paymentMethod === 'Net Banking'
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span className="payment-icon">
                        🏦
                      </span>

                      <span>
                        Net Banking
                      </span>

                    </label>

                  </div>

                </div>


                {/* TOTAL */}

                <div className="booking-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹
                    {Number(
                      selectedRoom.price
                    ).toLocaleString()}
                  </strong>

                </div>


                <button
                  type="submit"
                  className="confirm-booking-btn"
                >
                  Confirm & Pay
                </button>


                <p className="secure-payment">
                  🔒 Secure booking • Your information is protected
                </p>

              </form>

            </div>

          </div>

        )}

    </div>

  )

}

export default HotelDetails