import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Basic Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      // Fetch existing subscribers from LocalStorage
      const savedSubscribers = JSON.parse(
        localStorage.getItem("shopco_newsletter_subscribers") || "[]"
      );

      // Check if already subscribed
      if (savedSubscribers.includes(email.toLowerCase())) {
        setStatus({
          type: "info",
          message: "You are already subscribed to our newsletter!",
        });
        return;
      }

      // Append new email and update LocalStorage
      const updatedSubscribers = [...savedSubscribers, email.toLowerCase()];
      localStorage.setItem(
        "shopco_newsletter_subscribers",
        JSON.stringify(updatedSubscribers)
      );

      setStatus({
        type: "success",
        message: "Thank you for subscribing! Check your inbox for updates.",
      });
      setEmail("");
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <aside className="newsletter-section" aria-label="Newsletter Subscription">
      <div className="newsletter-container">
        
        <div className="newsletter-box">
          {/* Left Title */}
          <h2 className="newsletter-title">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>

          {/* Right Subscription Form */}
          <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
            <div className="newsletter-input-wrapper">
              <TfiEmail className="newsletter-mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status.message) setStatus({ type: "", message: "" });
                }}
                className="newsletter-input"
                aria-label="Email Address for newsletter"
                required
              />
            </div>

            <button type="submit" className="newsletter-submit-btn">
              Subscribe to Newsletter
            </button>

            {/* Dynamic Status Feedback */}
            {status.message && (
              <div className={`newsletter-status-alert ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>

      </div>
    </aside>
  );
}

export default Newsletter;