import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./TopSelling.css";

// Dynamic Product Assets Import
import p1 from "../../assets/products/product-1.png";
import p2 from "../../assets/products/product-2.png";
import p3 from "../../assets/products/product-3.png";
import p4 from "../../assets/products/product-4.png";
import p5 from "../../assets/products/product-5.png";
import p6 from "../../assets/products/product-6.png";
import p7 from "../../assets/products/product-7.png";
import p8 from "../../assets/products/product-8.png";

// Product List (5, 6, 7, 8 upfront; 1, 2, 3, 4 revealed on View All)
const ALL_TOP_SELLING = [
  {
    id: 5,
    title: "Vertical Striped Shirt",
    image: p5,
    rating: 5.0,
    price: 212,
    originalPrice: 232,
    discount: "-20%",
  },
  {
    id: 6,
    title: "Courage Graphic T-shirt",
    image: p6,
    rating: 4.0,
    price: 145,
    originalPrice: null,
    discount: null,
  },
  {
    id: 7,
    title: "Loose Fit Bermuda Shorts",
    image: p7,
    rating: 3.0,
    price: 80,
    originalPrice: null,
    discount: null,
  },
  {
    id: 8,
    title: "Faded Skinny Jeans",
    image: p8,
    rating: 4.5,
    price: 210,
    originalPrice: null,
    discount: null,
  },
  {
    id: 1,
    title: "T-shirt with Tape Details",
    image: p1,
    rating: 4.5,
    price: 120,
    originalPrice: null,
    discount: null,
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    image: p2,
    rating: 3.5,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
  },
  {
    id: 3,
    title: "Checkered Shirt",
    image: p3,
    rating: 4.5,
    price: 180,
    originalPrice: null,
    discount: null,
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    image: p4,
    rating: 4.5,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
  },
];

// Star Rating Component
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="star filled" />);
    } else if (i - rating === 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star filled" />);
    } else {
      stars.push(<FaRegStar key={i} className="star" />);
    }
  }
  return <div className="product-stars">{stars}</div>;
}

function TopSelling() {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? ALL_TOP_SELLING : ALL_TOP_SELLING.slice(0, 4);

  return (
    <section className="top-selling-section" aria-label="Top Selling Products">
      <div className="top-selling-container">
        
        <h2 className="section-heading">TOP SELLING</h2>

        <div className="product-grid">
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-box">
                <img src={product.image} alt={product.title} loading="lazy" />
              </Link>

              <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-title">
                  {product.title}
                </Link>

                <div className="product-rating-row">
                  <StarRating rating={product.rating} />
                  <span className="rating-number">{product.rating}/5</span>
                </div>

                <div className="product-price-row">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button
            type="button"
            className="view-all-btn"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View All"}
          </button>
        </div>

      </div>
    </section>
  );
}

export default TopSelling;