import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import './Hotels.css'

function Hotels({ onBookClick }) {
  const [searchParams] = useSearchParams()
  const searchCity = searchParams.get('city') || ''
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [price, setPrice] = useState(10000)
  const [rating, setRating] = useState(0)
  const [location, setLocation] = useState('All')
  const [amenities, setAmenities] = useState([])

  useEffect(() => {

  setLoading(true)
  setError('')

  const url = searchCity.trim()
    ? `http://localhost:8080/api/hotels/search?city=${encodeURIComponent(searchCity.trim())}`
    : 'http://localhost:8080/api/hotels'

  axios.get(url)

    .then(response => {

      console.log('Hotels fetched:', response.data)

      setHotels(response.data)
      setLoading(false)

    })

    .catch(error => {

      console.error('Error fetching hotels:', error)

      setError('Unable to load hotels. Please make sure the backend is running.')
      setLoading(false)

    })

}, [searchCity])


  const handleAmenityChange = (amenity) => {

    if (amenities.includes(amenity)) {

      setAmenities(
        amenities.filter(item => item !== amenity)
      )

    } else {

      setAmenities([
        ...amenities,
        amenity
      ])

    }

  }


  const handleBooking = (hotel) => {

    if (onBookClick) {
      onBookClick(hotel)
    }

  }


  const filteredHotels = hotels.filter((hotel) => {

    const hotelAmenities = hotel.amenities || []

    const priceMatch =
      hotel.price <= price

    const ratingMatch =
      hotel.rating >= rating

    const locationMatch =
      location === 'All' ||
      hotel.city === location ||
      hotel.location === location

    const amenityKeywords = {
  AC: ['ac', 'air conditioning', 'air conditioner'],
  WiFi: ['wifi', 'wi-fi', 'internet'],
  Pool: ['pool', 'swimming'],
  Parking: ['parking'],
  Garden: ['garden']
}

const amenitiesMatch =
  amenities.length === 0 ||
  amenities.every(item => {
    const keywords = amenityKeywords[item] || [item.toLowerCase()]

    return hotelAmenities.some(amenity => {
      const value = String(amenity).trim().toLowerCase()

      return keywords.some(keyword =>
        value.includes(keyword)
      )
    })
  })

    return (
      priceMatch &&
      ratingMatch &&
      locationMatch &&
      amenitiesMatch
    )

  })


  const clearFilters = () => {

    setPrice(10000)
    setRating(0)
    setLocation('All')
    setAmenities([])

  }


  return (

    <div className="hotels-page">

      {/* NAVBAR */}

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

        </div>

      </nav>


      {/* HEADING */}

      <div className="hotels-heading">

        <p>
          EXPLORE OUR COLLECTION
        </p>

        <h1>
          Find Your Perfect Hotel
        </h1>

        <span>
          Choose from our carefully selected hotels
        </span>

      </div>


      {/* MAIN */}

      <div className="hotels-main">


        {/* FILTERS */}

        <aside className="filters">

          <h2>
            Filters
          </h2>


          {/* PRICE */}

          <div className="filter-section">

            <h3>
              Price Range
            </h3>

            <p>
              Up to ₹{price.toLocaleString()}
            </p>

            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
            />

            <div className="price-values">

              <span>
                ₹1,000
              </span>

              <span>
                ₹10,000
              </span>

            </div>

          </div>


          {/* RATING */}

          <div className="filter-section">

            <h3>
              Rating
            </h3>


            <label>

              <input
                type="radio"
                name="rating"
                checked={rating === 0}
                onChange={() =>
                  setRating(0)
                }
              />

              All Ratings

            </label>


            <label>

              <input
                type="radio"
                name="rating"
                checked={rating === 4}
                onChange={() =>
                  setRating(4)
                }
              />

              ⭐ 4.0+

            </label>


            <label>

              <input
                type="radio"
                name="rating"
                checked={rating === 4.5}
                onChange={() =>
                  setRating(4.5)
                }
              />

              ⭐ 4.5+

            </label>

          </div>


          {/* LOCATION */}

          <div className="filter-section">

            <h3>
              Location
            </h3>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >

              <option value="All">
                All Locations
              </option>

              <option value="Chennai">
                Chennai
              </option>

              <option value="Coimbatore">
                Coimbatore
              </option>

              <option value="Ooty">
                Ooty
              </option>

              <option value="Bangalore">
                Bangalore
              </option>

              <option value="Madurai">
                Madurai
              </option>

              <option value="Pondicherry">
                Pondicherry
              </option>

            </select>

          </div>


          {/* AMENITIES */}

          <div className="filter-section">

            <h3>
              Amenities
            </h3>


            <label>

              <input
                type="checkbox"
                checked={amenities.includes('AC')}
                onChange={() =>
                  handleAmenityChange('AC')
                }
              />

              AC

            </label>


            <label>

              <input
                type="checkbox"
                checked={amenities.includes('WiFi')}
                onChange={() =>
                  handleAmenityChange('WiFi')
                }
              />

              WiFi

            </label>


            <label>

              <input
                type="checkbox"
                checked={amenities.includes('Pool')}
                onChange={() =>
                  handleAmenityChange('Pool')
                }
              />

              Swimming Pool

            </label>


            <label>

              <input
                type="checkbox"
                checked={amenities.includes('Parking')}
                onChange={() =>
                  handleAmenityChange('Parking')
                }
              />

              Parking

            </label>


            <label>

              <input
                type="checkbox"
                checked={amenities.includes('Garden')}
                onChange={() =>
                  handleAmenityChange('Garden')
                }
              />

              Garden

            </label>

          </div>


          <button
            className="clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </aside>


        {/* RESULTS */}

        <main className="hotel-results">

          <div className="results-top">

            <h2>
              Available Hotels
            </h2>

            <span>
              {filteredHotels.length} hotels found
            </span>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="no-results">

              <h2>
                Loading Hotels...
              </h2>

              <p>
                Please wait while we fetch hotels from the database.
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="no-results">

              <h2>
                Unable to Load Hotels
              </h2>

              <p>
                {error}
              </p>

            </div>

          )}


          {/* NO HOTELS */}

          {!loading && !error && filteredHotels.length === 0 && (

            <div className="no-results">

              <h2>
                No Hotels Found
              </h2>

              <p>
                Try changing your filters.
              </p>

            </div>

          )}


          {/* HOTEL LIST */}

          {!loading && !error && filteredHotels.length > 0 && (

            <div className="hotel-list">

              {filteredHotels.map((hotel) => (

                <div
                  className="hotel-result-card"
                  key={hotel.id}
                >

                  <Link to={`/hotels/${hotel.id}`}>
  <img
    src={hotel.image}
    alt={hotel.name}
  />
</Link>


                  <div className="hotel-result-info">

                    <span className="hotel-location">
                      📍 {hotel.location}
                    </span>


                    <Link
  to={`/hotels/${hotel.id}`}
  className="hotel-name-link"
>
  <h2>
    {hotel.name}
  </h2>
</Link>


                    <p>
                      {hotel.description || 'Comfortable stay with modern facilities'}
                    </p>


                    <div className="hotel-rating">
                      ⭐ {hotel.rating}
                    </div>


                    <div className="result-amenities">

                      {(hotel.amenities || []).map(
                        (item) => (

                          <span key={item}>
                            {item}
                          </span>

                        )
                      )}

                    </div>


                    <div className="result-bottom">

                      <div>

                        <strong>
                          ₹{Number(hotel.price).toLocaleString()}
                        </strong>

                        <small>
                          / night
                        </small>

                      </div>


                     <Link to={`/hotels/${hotel.id}`} className="result-book-btn">
  View Rooms
</Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>

    </div>

  )

}

export default Hotels