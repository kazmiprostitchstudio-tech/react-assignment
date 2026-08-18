import { Link } from "react-router-dom";
import heroImg from "../../assets/hero-models.png"; // Aapki Figma/Local picture
import "./Hero.css";

function SparkleStar({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M52 0C52 28.7188 75.2812 52 104 52C75.2812 52 52 75.2812 52 104C52 75.2812 28.7188 52 0 52C28.7188 52 52 28.7188 52 0Z"
        fill="#000000"
      />
    </svg>
  );
}

function Hero({
  title = "FIND CLOTHES THAT MATCHES YOUR STYLE",
  subtitle = "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
  ctaText = "Shop Now",
  ctaLink = "/shop",
  stats = [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High-Quality Products" },
    { value: "30,000+", label: "Happy Customers" },
  ],
}) {
  return (
    <section className="hero-section" aria-label="Hero Introduction">
      <div className="hero-container">
        
        {/* Left Column */}
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>

          <Link to={ctaLink} className="hero-cta-btn">
            {ctaText}
          </Link>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column with Figma Image */}
        <div className="hero-image-wrapper">
          <SparkleStar className="sparkle-star sparkle-big" />
          <SparkleStar className="sparkle-star sparkle-small" />
          <img
            src={heroImg}
            alt="Fashion Models"
            className="hero-image"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;