import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate
} from 'react-router-dom'

import { useState, useEffect } from 'react'

import './App.css'
import Profile from './Profile'

import Hotels from './Hotels'
import Login from './Login'
import MyBookings from './MyBookings'
import HotelDetails from './pages/HotelDetails'

function Navbar() {

  const navigate = useNavigate()

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'


  const handleLogout = () => {

    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')

    alert('You have been logged out')

    navigate('/')

  }


  return (

    <nav className="navbar">

      <Link to="/" className="logo">
        <span>Stay</span>Easy
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/hotels">
          Hotels
        </Link>

        <Link to="/bookings">
          My Bookings
        </Link>


        {isLoggedIn ? (

          <button
            className="login-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

        )}

      </div>

    </nav>

  )
}


/* HOME PAGE */

function Home() {

  const [location, setLocation] = useState('')

  const [popularHotels, setPopularHotels] =
    useState([])

  const navigate = useNavigate()


  /* GET HOTELS FROM BACKEND */

  useEffect(() => {

    fetch('http://localhost:8080/api/hotels')

      .then(response => {

        if (!response.ok) {
          throw new Error('Failed to fetch hotels')
        }

        return response.json()

      })

      .then(data => {

        console.log('Hotels from backend:', data)

        setPopularHotels(data.slice(0, 3))

      })

      .catch(error => {

        console.error(
          'Error fetching hotels:',
          error
        )

      })

  }, [])


  /* SEARCH */

  const handleSearch = () => {

    if (location.trim() === '') {

      alert('Please enter a location')

      return

    }

    const city =
      encodeURIComponent(location.trim())

    navigate(
      '/hotels?city=' + city
    )

  }


  return (

    <div className="app">

      <Navbar />


      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO STAYEASY
          </p>


          <h1 className="hero-title">

            <span className="hero-first-line">
              Find Your Perfect
            </span>

            <br />

            <span className="hero-second-line">
              Hotel Stay
            </span>

          </h1>


          <p className="subtitle">
            Search, compare and book comfortable hotels
            at the best prices.
          </p>


          {/* SEARCH BOX */}

          <div className="search-box">

            <div className="input-group">

              <label>
                LOCATION
              </label>

              <div className="field-content">

                <span className="field-icon">
                  📍
                </span>

                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                CHECK-IN
              </label>

              <div className="field-content">

                <span className="field-icon">
                  📅
                </span>

                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                CHECK-OUT
              </label>

              <div className="field-content">

                <span className="field-icon">
                  📅
                </span>

                <input
                  type="date"
                  min={
                    new Date()
                      .toISOString()
                      .split('T')[0]
                  }
                />

              </div>

            </div>


            <button
              type="button"
              className="search-btn"
              onClick={handleSearch}
            >
              Search Hotels
            </button>

          </div>

        </div>

      </section>


      {/* POPULAR HOTELS */}

      <section className="popular">

        <div className="section-heading">

          <p>
            EXPLORE OUR HOTELS
          </p>

          <h2>
            Popular Hotels
          </h2>

        </div>


        <div className="hotel-container">

          {popularHotels.length === 0 ? (

            <p>
              Loading hotels...
            </p>

          ) : (

            popularHotels.map((hotel) => (

              <Link
                key={hotel.id}
                to={'/hotels/' + hotel.id}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >

                <div className="hotel-card">

                  <img
                    src={
                      hotel.image +
                      '?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={hotel.name}
                  />


                  <div className="hotel-info">

                    <span className="location">
                      📍 {hotel.city}
                    </span>


                    <h3>
                      {hotel.name}
                    </h3>


                    <p>
                      {hotel.description ||
                        'Comfortable rooms with modern facilities'}
                    </p>


                    {/* AMENITIES */}

                    <div className="amenities">

                      {(hotel.amenities || [])
                        .slice(0, 3)
                        .map(
                          (amenity, index) => (

                            <span
                              key={index}
                            >

                              {amenity === 'AC' &&
                                '❄ '}

                              {amenity === 'WiFi' &&
                                '📶 '}

                              {amenity === 'Pool' &&
                                '🏊 '}

                              {amenity === 'Parking' &&
                                '🚗 '}

                              {amenity === 'Garden' &&
                                '🌿 '}

                              {amenity}

                            </span>

                          )
                        )}

                    </div>


                    {/* PRICE + RATING */}

                    <div className="hotel-bottom">

                      <div>

                        <strong>
                          ₹
                          {hotel.price
                            ? hotel.price.toLocaleString(
                                'en-IN'
                              )
                            : '0'}
                        </strong>

                        <small>
                          / night
                        </small>

                      </div>


                      <span className="rating">
                        ⭐ {hotel.rating}
                      </span>

                    </div>


                    {/* AVAILABILITY */}

                    <div className="status available">
                      ● Available
                    </div>

                  </div>

                </div>

              </Link>

            ))

          )}

        </div>

      </section>

    </div>

  )
}


/* PROTECTED ROUTE */

function ProtectedRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem('isLoggedIn') === 'true'


  if (!isLoggedIn) {

    return (

      <Navigate
        to="/login"
        replace
      />

    )

  }


  return children

}


/* APP */

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* HOTELS */}

        <Route
          path="/hotels"
          element={<Hotels />}
        />


        {/* HOTEL DETAILS */}

        <Route
          path="/hotels/:id"
          element={<HotelDetails />}
        />


        {/* MY BOOKINGS */}

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
  path="/bookings"
  element={
    <ProtectedRoute>
      <MyBookings />
    </ProtectedRoute>
  }
/>
      </Routes>
      

    </BrowserRouter>

  )

}


export default App
