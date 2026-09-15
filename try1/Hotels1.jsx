import { Link } from 'react-router-dom'
import './Hotels.css'

function Hotels() {
  return (
    <div className="hotels-page">

      {/* NAVBAR */}
      <nav className="hotels-navbar">
        <Link to="/" className="logo">
          🛏️ <span>Stay<span>Easy</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/hotels" className="active">Hotels</Link>
          <Link to="/bookings">My Bookings</Link>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hotel-hero">
        <div className="hero-content">
          <div className="location-symbol">📍</div>
          <h1>Find Your Perfect Hotel</h1>
          <p>Discover comfortable stays at your preferred location.</p>
        </div>

        <button className="location-btn">
          📍 &nbsp; Use My Location
        </button>
      </section>

      {/* SEARCH BAR */}
      <div className="hotel-search">

        <div className="search-field">
          <div className="search-icon">📍</div>
          <div>
            <label>LOCATION</label>
            <input type="text" placeholder="Where are you going?" />
          </div>
          <span className="down-arrow">⌄</span>
        </div>

        <div className="search-field">
          <div className="search-icon">📅</div>
          <div>
            <label>CHECK-IN</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <span className="down-arrow">⌄</span>
        </div>

        <div className="search-field">
          <div className="search-icon">📅</div>
          <div>
            <label>CHECK-OUT</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <span className="down-arrow">⌄</span>
        </div>

        <button className="search-button">
          🔍 &nbsp; Search
        </button>

      </div>

      {/* MAIN CONTENT */}
      <main className="hotel-main">

        {/* FILTER */}
        <aside className="filter-box">

          <h2>Filter Results</h2>

          <div className="filter-section">
            <label>Location</label>
            <div className="filter-input">
              🔍
              <input placeholder="Search city or area" />
            </div>
          </div>

          <div className="filter-section">
            <label>Price Range</label>

            <input
              type="range"
              min="1000"
              max="10000"
              className="price-range"
            />

            <div className="price-text">
              ₹1,000 - ₹10,000+
            </div>
          </div>

          <div className="filter-section">
            <label>Rating</label>

            <div className="check-option">
              <input type="checkbox" />
              <span>⭐</span> 4.5 & above
            </div>

            <div className="check-option">
              <input type="checkbox" />
              <span>⭐</span> 4.0 & above
            </div>

            <div className="check-option">
              <input type="checkbox" />
              <span>⭐</span> 3.5 & above
            </div>
          </div>

          <div className="filter-section">
            <label>Amenities</label>

            <div className="check-option">
              <input type="checkbox" /> 📶 Free WiFi
            </div>

            <div className="check-option">
              <input type="checkbox" /> ❄️ Air Conditioning
            </div>

            <div className="check-option">
              <input type="checkbox" /> 🏊 Swimming Pool
            </div>

            <div className="check-option">
              <input type="checkbox" /> 🅿️ Parking
            </div>

            <div className="check-option">
              <input type="checkbox" /> 🍽️ Restaurant
            </div>

            <div className="check-option">
              <input type="checkbox" /> 🏋️ Gym
            </div>
          </div>

          <button className="clear-btn">
            ⟳ &nbsp; Clear Filters
          </button>

        </aside>

        {/* HOTEL RESULTS */}
        <section className="hotel-results">

          <div className="results-header">

            <div>
              <span className="available-title">AVAILABLE HOTELS</span>
              <h2>Hotels near you</h2>
            </div>

            <div className="sort-area">
              <span>Sort by</span>

              <select>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>

          </div>

          {/* HOTEL 1 */}
          <div className="hotel-card">

            <div className="hotel-image">
              <img
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=700&q=80"
                alt="Grand Palace Hotel"
              />
              <span className="hotel-badge gold">👑 Top Rated</span>
            </div>

            <div className="hotel-info">

              <div className="hotel-top">
                <div>
                  <h3>Grand Palace Hotel</h3>
                  <p className="hotel-location">📍 Madurai</p>
                </div>

                <div className="rating">⭐ 4.5</div>
              </div>

              <p className="hotel-description">
                Comfortable rooms with modern facilities and excellent service.
              </p>

              <div className="amenities">
                <span>🛏️ King Bed</span>
                <span>❄️ AC</span>
                <span>📶 WiFi</span>
              </div>

              <div className="hotel-bottom">
                <div className="hotel-price">
                  <span>₹ 2,500</span>
  <small>/ night</small>
                </div>

                <div className="available">
                  ● Rooms available
                </div>

                <button className="rooms-btn">
                  View rooms &nbsp; →
                </button>
              </div>

            </div>
          </div>

          {/* HOTEL 2 */}
          <div className="hotel-card">

            <div className="hotel-image">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
                alt="Royal Comfort"
              />
              <span className="hotel-badge purple">♛ Popular</span>
            </div>

            <div className="hotel-info">

              <div className="hotel-top">
                <div>
                  <h3>Royal Comfort</h3>
                  <p className="hotel-location">📍 Chennai</p>
                </div>

                <div className="rating">⭐ 4.3</div>
              </div>

              <p className="hotel-description">
                Luxury rooms with premium amenities and swimming pool.
              </p>

              <div className="amenities">
                <span>🛏️ Queen Bed</span>
                <span>❄️ AC</span>
                <span>🏊 Pool</span>
              </div>

              <div className="hotel-bottom">
                <div className="hotel-price">
                  ₹3,000 <small>/ night</small>
                </div>

                <div className="available">
                  ● Rooms available
                </div>

                <button className="rooms-btn">
                  View rooms &nbsp; →
                </button>
              </div>

            </div>
          </div>

          {/* HOTEL 3 */}
          <div className="hotel-card">

            <div className="hotel-image">
              <img
                src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=700&q=80"
                alt="Green Valley Resort"
              />
              <span className="hotel-badge green">♛ Best Value</span>
            </div>

            <div className="hotel-info">

              <div className="hotel-top">
                <div>
                  <h3>Green Valley Resort</h3>
                  <p className="hotel-location">📍 Kodaikanal</p>
                </div>

                <div className="rating">⭐ 4.7</div>
              </div>

              <p className="hotel-description">
                Peaceful resort surrounded by nature with beautiful valley views.
              </p>

              <div className="amenities">
                <span>🛏️ King Bed</span>
                <span>🌳 Garden</span>
                <span>📶 WiFi</span>
              </div>

              <div className="hotel-bottom">
                <div className="hotel-price">
                  ₹4,000 <small>/ night</small>
                </div>

                <div className="available">
                  ● Rooms available
                </div>

                <button className="rooms-btn">
                  View rooms &nbsp; →
                </button>
              </div>

            </div>
          </div>

          {/* MAP */}
          <div className="map-box">

            <div className="map-content">
              <div className="map-icon">📍</div>

              <div>
                <h3>Explore hotels on map</h3>
                <p>Find the best stays near your location.</p>
              </div>
            </div>

            <button className="map-btn">
              🗺️ &nbsp; View on Map
            </button>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Hotels