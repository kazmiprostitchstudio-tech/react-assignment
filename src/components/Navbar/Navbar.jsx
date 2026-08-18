import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Dynamic Cart Badge Listener from LocalStorage
  useEffect(() => {
    const calculateCartCount = () => {
      try {
        const savedCart = localStorage.getItem("shopco_cart");
        if (savedCart) {
          const items = JSON.parse(savedCart);
          const totalQty = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
          setCartCount(totalQty);
        } else {
          setCartCount(3); // Default initial items count matching design
        }
      } catch {
        setCartCount(0);
      }
    };

    calculateCartCount();

    // Listen for storage changes across tabs / components
    window.addEventListener("storage", calculateCartCount);
    const interval = setInterval(calculateCartCount, 1000);

    return () => {
      window.removeEventListener("storage", calculateCartCount);
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/casual?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      closeMobileMenu();
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
                <Link to="/category/casual" onClick={closeMobileMenu}>Casual</Link>
                <Link to="/category/casual" onClick={closeMobileMenu}>Men's Clothes</Link>
                <Link to="/category/casual" onClick={closeMobileMenu}>Women's Clothes</Link>
                <Link to="/category/casual" onClick={closeMobileMenu}>Formal Wear</Link>
              </div>
            )}
          </li>

          <li>
            <NavLink 
              to="/category/casual" 
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
              onClick={closeMobileMenu}
            >
              On Sale
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category/casual" 
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
              onClick={closeMobileMenu}
            >
              New Arrivals
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/category/casual" 
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
              onClick={closeMobileMenu}
            >
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
          <Link to="/cart" className="navbar-action-btn" aria-label="Shopping Cart" onClick={closeMobileMenu}>
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <Link to="/signup" className="navbar-action-btn" aria-label="User Account" onClick={closeMobileMenu}>
            <FiUser />
          </Link>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;