import { useRef } from "react";
import { FaStar, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Testimonials.css";

// 6 Dynamic Customer Reviews Data (Backend Ready)
const REVIEWS_DATA = [
  {
    id: 1,
    name: "Sarah M.",
    verified: true,
    rating: 5,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    verified: true,
    rating: 5,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    verified: true,
    rating: 5,
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: "Emily R.",
    verified: true,
    rating: 5,
    review:
      "The fabric quality, fitting, and packaging were all top-notch! Delivery was super fast, and the customer service team was very helpful with size adjustments.",
  },
  {
    id: 5,
    name: "Michael B.",
    verified: true,
    rating: 5,
    review:
      "Solid apparel at great prices. The oversized tees and cargo pants fit perfectly without losing shape after several washes. Definitely buying again!",
  },
  {
    id: 6,
    name: "Olivia T.",
    verified: true,
    rating: 5,
    review:
      "Shop.co makes online shopping effortless. The product colors and cuts look identical in person to how they appear on the website.",
  },
];

function Testimonials() {
  const sliderRef = useRef(null);

  // Smooth Horizontal Scroll Logic
  const handleScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 400; // Scroll distance in pixels
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="testimonials-section" aria-label="Customer Testimonials">
      <div className="testimonials-container">
        
        {/* Header with Title & Functional Arrows */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">OUR HAPPY CUSTOMERS</h2>
          
          <div className="testimonials-controls">
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => handleScroll("left")}
              aria-label="Previous Reviews"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              className="slider-arrow-btn"
              onClick={() => handleScroll("right")}
              aria-label="Next Reviews"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div className="testimonials-carousel" ref={sliderRef}>
          {REVIEWS_DATA.map((item) => (
            <article key={item.id} className="review-card">
              {/* 5-Star Rating */}
              <div className="review-stars" aria-label={`${item.rating} out of 5 stars`}>
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="star-icon" />
                ))}
              </div>

              {/* Customer Name & Verified Badge */}
              <div className="review-author-row">
                <span className="review-author-name">{item.name}</span>
                {item.verified && <FaCheckCircle className="verified-badge-icon" />}
              </div>

              {/* Review Text */}
              <p className="review-text">"{item.review}"</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;