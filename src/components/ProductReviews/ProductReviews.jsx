import { useState } from "react";
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaCheckCircle, 
  FaEllipsisH, 
  FaSlidersH, 
  FaChevronDown,
  FaTimes
} from "react-icons/fa";
import "./ProductReviews.css";

// Initial Core Dataset
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    verified: true,
    review: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023",
    timestamp: 1691971200000,
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4.0,
    verified: true,
    review: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: "August 15, 2023",
    timestamp: 1692057600000,
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    verified: true,
    review: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    date: "August 16, 2023",
    timestamp: 1692144000000,
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4.0,
    verified: true,
    review: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    date: "August 17, 2023",
    timestamp: 1692230400000,
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4.0,
    verified: true,
    review: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: "August 18, 2023",
    timestamp: 1692316800000,
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    verified: true,
    review: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: "August 19, 2023",
    timestamp: 1692403200000,
  },
  {
    id: 7,
    name: "Daniel S.",
    rating: 5.0,
    verified: true,
    review: "Incredible cloth quality. Washed it three times and zero shrinkage. Fits true to size!",
    date: "August 20, 2023",
    timestamp: 1692489600000,
  },
  {
    id: 8,
    name: "Chloe W.",
    rating: 5.0,
    verified: true,
    review: "Super soft texture and modern cut. Fast delivery too! Highly recommended for casual streetwear.",
    date: "August 21, 2023",
    timestamp: 1692576000000,
  },
];

// Helper: Render Star Icons
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="star-icon filled" />);
    } else if (i - rating === 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star-icon filled" />);
    } else {
      stars.push(<FaRegStar key={i} className="star-icon" />);
    }
  }
  return <div className="review-stars-row">{stars}</div>;
}

function ProductReviews({ totalReviewsCount = 451 }) {
  // Direct Safe Lazy Initialization from LocalStorage
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem("shopco_product_reviews");
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [visibleCount, setVisibleCount] = useState(6);
  const [sortBy, setSortBy] = useState("latest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");

  // Sorting Logic
  const sortedReviews = [...reviewsList].sort((a, b) => {
    if (sortBy === "latest") return b.timestamp - a.timestamp;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  // Displayed subset
  const currentReviews = sortedReviews.slice(0, visibleCount);

  // Handle Load More / View Less Toggle
  const handleLoadMore = () => {
    if (visibleCount >= sortedReviews.length) {
      setVisibleCount(6);
    } else {
      setVisibleCount((prev) => prev + 6);
    }
  };

  // Submit New Review (Saves dynamically into state & LocalStorage)
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: formName.trim(),
      rating: Number(formRating),
      verified: true,
      review: formComment.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem("shopco_product_reviews", JSON.stringify(updated));

    // Reset & Close
    setFormName("");
    setFormComment("");
    setFormRating(5);
    setIsModalOpen(false);
  };

  return (
    <section className="product-reviews-section" aria-label="Customer Reviews">
      <div className="product-reviews-container">
        
        {/* Top Control Bar */}
        <div className="reviews-top-bar">
          <div className="reviews-heading-wrap">
            <h3 className="reviews-title">All Reviews</h3>
            <span className="reviews-count-badge">
              ({totalReviewsCount + (reviewsList.length - INITIAL_REVIEWS.length)})
            </span>
          </div>

          <div className="reviews-actions-group">
            <button type="button" className="icon-filter-btn" aria-label="Open Filter">
              <FaSlidersH />
            </button>

            <div className="sort-dropdown-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
                aria-label="Sort Reviews"
              >
                <option value="latest">Latest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
              <FaChevronDown className="sort-dropdown-arrow" />
            </div>

            <button 
              type="button" 
              className="write-review-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews 2-Column Grid */}
        <div className="reviews-grid">
          {currentReviews.map((item) => (
            <article key={item.id} className="review-box">
              <div className="review-box-header">
                <StarRating rating={item.rating} />
                <button type="button" className="dots-menu-btn" aria-label="More options">
                  <FaEllipsisH />
                </button>
              </div>

              <div className="reviewer-name-row">
                <span className="reviewer-name">{item.name}</span>
                {item.verified && <FaCheckCircle className="verified-check" />}
              </div>

              <p className="reviewer-comment">"{item.review}"</p>

              <div className="review-date">Posted on {item.date}</div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="load-more-wrap">
          <button type="button" className="load-more-btn" onClick={handleLoadMore}>
            {visibleCount >= sortedReviews.length ? "View Less" : "Load More Reviews"}
          </button>
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="review-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="review-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Write a Review</h4>
              <button type="button" className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="modal-form">
              <label>
                Your Name
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </label>

              <label>
                Rating (1 to 5 Stars)
                <select value={formRating} onChange={(e) => setFormRating(e.target.value)}>
                  <option value="5">5 - Excellent</option>
                  <option value="4.5">4.5 - Very Good</option>
                  <option value="4">4 - Good</option>
                  <option value="3.5">3.5 - Average</option>
                  <option value="3">3 - Fair</option>
                </select>
              </label>

              <label>
                Review Comments
                <textarea
                  rows="4"
                  placeholder="Describe the fabric quality, fitting, style..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="submit-modal-btn">
                Post Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductReviews;