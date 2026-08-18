import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import "./TopBanner.css";

function TopBanner({ 
  message = "Sign up and get 20% off to your first order.", 
  linkText = "Sign Up Now", 
  linkUrl = "/signup" 
}) {
  // Dismissible state: controls visibility when user clicks the close icon
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside className="top-banner" aria-label="Announcement">
      <div className="top-banner-container">
        <p className="top-banner-text">
          <span>{message}</span>{" "}
          <Link to={linkUrl} className="top-banner-link">
            {linkText}
          </Link>
        </p>

        <button
          type="button"
          className="top-banner-close"
          onClick={() => setIsVisible(false)}
          aria-label="Close Announcement"
        >
          <IoClose />
        </button>
      </div>
    </aside>
  );
}

export default TopBanner;