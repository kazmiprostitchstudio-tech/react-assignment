import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./NewArrivals.css";
import fallbackImg from "../../assets/products/product-1.png";

function StarRating({ rating = 4.5 }) {
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

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-e-commerce-admin-hk.vercel.app/api/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error("Error fetching new arrivals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="new-arrivals-section" aria-label="New Arrivals">
      <div className="new-arrivals-container">
        <h2 className="section-heading">NEW ARRIVALS</h2>

        {loading ? (
          <p style={{ textAlign: "center", padding: "30px" }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign: "center", padding: "30px" }}>No products available yet.</p>
        ) : (
          <>
            <div className="product-grid">
              {displayedProducts.map((product) => {
                const productId = product._id || product.id;
                const productImage = product.imageUrl || product.image || fallbackImg;
                const productRating = product.rating || 4.5;

                return (
                  <div key={productId} className="product-card">
                    <Link to={`/product/${productId}`} className="product-image-box">
                      <img
                        src={productImage}
                        alt={product.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = fallbackImg;
                        }}
                      />
                    </Link>

                    <div className="product-info">
                      <Link to={`/product/${productId}`} className="product-title">
                        {product.title}
                      </Link>

                      <div className="product-rating-row">
                        <StarRating rating={productRating} />
                        <span className="rating-number">{productRating}/5</span>
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
                );
              })}
            </div>

            {products.length > 4 && (
              <div className="view-all-wrapper">
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "View Less" : "View All"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;