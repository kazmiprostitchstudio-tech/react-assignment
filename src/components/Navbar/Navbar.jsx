import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-container" aria-label="Main Navigation">
        
        {/* Left Side: Mobile Menu Toggle & Brand Logo */}
        <div className="navbar-left">
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            SHOP.CO
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className={`navbar-links ${mobileMenuOpen ? "active" : ""}`}>
          <li 
            className="navbar-dropdown-item"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button 
              type="button"
              className="navbar-link-btn"
              onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
            >
              Shop <FiChevronDown className={`dropdown-icon ${shopDropdownOpen ? "rotate" : ""}`} />
            </button>

            {shopDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/shop/men" onClick={closeMobileMenu}>Men's Clothes</Link>
                <Link to="/shop/women" onClick={closeMobileMenu}>Women's Clothes</Link>
                <Link to="/shop/casual" onClick={closeMobileMenu}>Casual Wear</Link>
                <Link to="/shop/formal" onClick={closeMobileMenu}>Formal Wear</Link>
              </div>
            )}
          </li>

          <li>
            <NavLink to="/on-sale" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={closeMobileMenu}>
              On Sale
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-arrivals" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={closeMobileMenu}>
              New Arrivals
            </NavLink>
          </li>
          <li>
            <NavLink to="/brands" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={closeMobileMenu}>
              Brands
            </NavLink>
          </li>
        </ul>

        {/* Search Bar */}
        <form className="navbar-search-form" onSubmit={handleSearch}>
          <FiSearch className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            aria-label="Search for products"
          />
        </form>

        {/* Right Side Action Icons */}
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-action-btn" aria-label="Shopping Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link to="/signup" className="navbar-action-btn" aria-label="User Account">
            <FiUser />
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;