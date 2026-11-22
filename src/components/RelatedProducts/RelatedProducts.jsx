import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./RelatedProducts.css";
import fallbackImg from "../../assets/related/related-1.png";

function StarRating({ rating = 4.5 }) {
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
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const res = await axios.get("https://backend-e-commerce-admin-hk.vercel.app/api/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        const filtered = data.filter((item) => (item._id || item.id) !== id);
        setProducts((filtered.length > 0 ? filtered : data).slice(0, 4));
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedProducts();
  }, [id]);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section" aria-label="Related Products">
      <div className="related-products-container">
        <h2 className="related-title">YOU MIGHT ALSO LIKE</h2>

        <div className="related-grid">
          {products.map((product) => {
            const productId = product._id || product.id;
            const productImage = product.imageUrl || product.image || fallbackImg;
            const productRating = product.rating || 4.5;

            return (
              <div key={productId} className="related-card">
                <Link to={`/product/${productId}`} className="related-image-box">
                  <img
                    src={productImage}
                    alt={product.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = fallbackImg;
                    }}
                  />
                </Link>

                <div className="related-info">
                  <Link to={`/product/${productId}`} className="related-card-title">
                    {product.title}
                  </Link>

                  <div className="related-rating-row">
                    <StarRating rating={productRating} />
                    <span className="related-rating-score">{productRating}/5</span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RelatedProducts;