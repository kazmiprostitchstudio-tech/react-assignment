import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./RelatedProducts.css";

import rel1 from "../../assets/related/related-1.png";
import rel2 from "../../assets/related/related-2.png";
import rel3 from "../../assets/related/related-3.png";
import rel4 from "../../assets/related/related-4.png";

const RELATED_DATA = [
  {
    id: "polo-contrast-trims",
    title: "Polo with Contrast Trims",
    image: rel1,
    rating: 4.0,
    price: 212,
    originalPrice: 242,
    discount: "-20%",
  },
  {
    id: "gradient-graphic-tshirt",
    title: "Gradient Graphic T-shirt",
    image: rel2,
    rating: 3.5,
    price: 145,
    originalPrice: null,
    discount: null,
  },
  {
    id: "polo-tipping-details",
    title: "Polo with Tipping Details",
    image: rel3,
    rating: 4.5,
    price: 180,
    originalPrice: null,
    discount: null,
  },
  {
    id: "black-striped-tshirt",
    title: "Black Striped T-shirt",
    image: rel4,
    rating: 5.0,
    price: 120,
    originalPrice: 150,
    discount: "-30%",
  },
];

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
  return <div className="related-stars-row">{stars}</div>;
}

function RelatedProducts() {
  return (
    <section className="related-products-section" aria-label="Related Products">
      <div className="related-products-container">
        
        <h2 className="related-title">YOU MIGHT ALSO LIKE</h2>

        <div className="related-grid">
          {RELATED_DATA.map((product) => (
            <div key={product.id} className="related-card">
              <Link to={`/product/${product.id}`} className="related-image-box">
                <img src={product.image} alt={product.title} loading="lazy" />
              </Link>

              <div className="related-info">
                <Link to={`/product/${product.id}`} className="related-card-title">
                  {product.title}
                </Link>

                <div className="related-rating-row">
                  <StarRating rating={product.rating} />
                  <span className="related-rating-score">{product.rating}/5</span>
                </div>

                <div className="related-price-row">
                  <span className="related-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="related-original-price">${product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <span className="related-discount-badge">{product.discount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default RelatedProducts;