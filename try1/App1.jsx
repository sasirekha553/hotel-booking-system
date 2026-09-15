import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Hotels from './Hotels1'

function Home() {
  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span>Stay</span>Easy
        </div>

        <div className="nav-links">
          <span>Home</span>
          <Link to="/hotels">Hotels</Link>
          <span>My Bookings</span>
          <button className="login-btn">Login</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <p className="welcome">WELCOME TO STAYEASY</p>

          <h1 className="hero-title">
  <span className="hero-first-line">Find Your Perfect</span>
  <br />
  <span className="hero-second-line">Hotel Stay</span>
</h1>
          <p className="subtitle">
            Search, compare and book comfortable hotels
            at the best prices.
          </p>

          {/* SEARCH BOX */}
          <div className="search-box">

  <div className="input-group location-group">
    <label>LOCATION</label>
    <div className="field-content">
      <span className="field-icon">📍</span>
      <input
        type="text"
        placeholder="Where are you going?"
      />
    </div>
  </div>

  <div className="input-group date-group">
    <label>CHECK-IN</label>
    <div className="field-content">
      <span className="field-icon">📅</span>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        defaultValue={new Date().toISOString().split("T")[0]}
      />
    </div>
  </div>

  <div className="input-group date-group">
    <label>CHECK-OUT</label>
    <div className="field-content">
      <span className="field-icon">📅</span>
      <input
        type="date"
        min={new Date().toISOString().split("T")[0]}
        defaultValue={new Date().toISOString().split("T")[0]}
      />
    </div>
  </div>

  <Link to="/hotels" className="search-btn">
  Search Hotels
</Link>

</div>

        </div>

      </section>

      {/* POPULAR HOTELS */}
      <section className="popular">

        <div className="section-heading">
          <p>EXPLORE OUR HOTELS</p>
          <h2>Popular Hotels</h2>
        </div>

        <div className="hotel-container">

          {/* HOTEL 1 */}
          <div className="hotel-card">

            <img
              src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
              alt="Grand Palace Hotel"
            />

            <div className="hotel-info">

              <span className="location">
                📍 Madurai
              </span>

              <h3>Grand Palace Hotel</h3>

              <p>
                Comfortable rooms with modern facilities
              </p>

              <div className="amenities">
                <span>🛏 King Bed</span>
                <span>❄ AC</span>
                <span>📶 WiFi</span>
              </div>

              <div className="hotel-bottom">

                <div>
                  <strong>₹2,500</strong>
                  <small> / night</small>
                </div>

                <span className="rating">
                  ⭐ 4.5
                </span>

              </div>

              <div className="status available">
                ● Available
              </div>

              <button className="book-btn">
                Book Now
              </button>

            </div>

          </div>

          {/* HOTEL 2 */}
          <div className="hotel-card">

            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
              alt="Royal Comfort"
            />

            <div className="hotel-info">

              <span className="location">
                📍 Chennai
              </span>

              <h3>Royal Comfort</h3>

              <p>
                Luxury stay with excellent amenities
              </p>

              <div className="amenities">
                <span>🛏 Queen Bed</span>
                <span>❄ AC</span>
                <span>🏊 Pool</span>
              </div>

              <div className="hotel-bottom">

                <div>
                  <strong>₹3,000</strong>
                  <small> / night</small>
                </div>

                <span className="rating">
                  ⭐ 4.3
                </span>

              </div>

              <div className="status available">
                ● Available
              </div>

              <button className="book-btn">
                Book Now
              </button>

            </div>

          </div>

          {/* HOTEL 3 */}
          <div className="hotel-card">

            <img
              src="https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80"
              alt="Green Valley Resort"
            />

            <div className="hotel-info">

              <span className="location">
                📍 Kodaikanal
              </span>

              <h3>Green Valley Resort</h3>

              <p>
                Peaceful resort surrounded by nature
              </p>

              <div className="amenities">
                <span>🛏 King Bed</span>
                <span>🌿 Garden</span>
                <span>📶 WiFi</span>
              </div>

              <div className="hotel-bottom">

                <div>
                  <strong>₹4,000</strong>
                  <small> / night</small>
                </div>

                <span className="rating">
                  ⭐ 4.7
                </span>

              </div>

              <div className="status available">
                ● Available
              </div>

              <button className="book-btn">
                Book Now
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/hotels" element={<Hotels />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App