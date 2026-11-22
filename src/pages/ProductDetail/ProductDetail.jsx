import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import "./ProductDetail.css";
import fallbackImg from "../../assets/product-detail/detail-1.png";

const DEFAULT_COLORS = [
  { id: "olive", hex: "#4F4631", name: "Olive Green" },
  { id: "forest", hex: "#314F4A", name: "Forest Green" },
  { id: "navy", hex: "#2C3049", name: "Dark Navy" },
];

const DEFAULT_SIZES = ["Small", "Medium", "Large", "X-Large"];

function StarRating({ rating = 4.5 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="detail-star filled" />);
    } else if (i - rating === 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="detail-star filled" />);
    } else {
      stars.push(<FaRegStar key={i} className="detail-star" />);
    }
  }
  return <div className="detail-stars">{stars}</div>;
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0].id);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://backend-e-commerce-admin-hk.vercel.app/api/products");
        const list = Array.isArray(res.data) ? res.data : res.data.products || [];
        const found = list.find((item) => (item._id || item.id) === id) || list[0] || null;
        setProduct(found);
        if (found) {
          const mainImg = found.imageUrl || found.image || fallbackImg;
          setSelectedImage(mainImg);
        }
      } catch (err) {
        console.error("Error fetching product detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const productId = product._id || product.id;
    const cartItem = {
      id: productId,
      title: product.title,
      price: Number(product.price),
      image: selectedImage || fallbackImg,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("shopco_cart") || "[]");
    const itemIndex = existingCart.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.color === cartItem.color &&
        item.size === cartItem.size
    );

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("shopco_cart", JSON.stringify(existingCart));

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container" style={{ textAlign: "center", padding: "80px 0" }}>
          <h2>Loading Product Details...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container" style={{ textAlign: "center", padding: "80px 0" }}>
          <h2>Product Not Found</h2>
          <Link to="/" style={{ textDecoration: "underline", color: "#000" }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.imageUrl || product.image || fallbackImg];

  const productColors =
    Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : DEFAULT_COLORS;

  const productSizes =
    Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : DEFAULT_SIZES;

  const productRating = product.rating || 4.5;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <Link to="/shop">Shop</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">{product.category || "Products"}</span>
        </nav>

        <div className="product-main-grid">
          <div className="product-gallery">
            <div className="thumbnail-list">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    onError={(e) => {
                      e.target.src = fallbackImg;
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="main-image-display">
              <img
                src={selectedImage || fallbackImg}
                alt={product.title}
                onError={(e) => {
                  e.target.src = fallbackImg;
                }}
              />
            </div>
          </div>

          <div className="product-actions-info">
            <h1 className="detail-product-title">{product.title}</h1>

            <div className="detail-rating-row">
              <StarRating rating={productRating} />
              <span className="detail-rating-score">{productRating}/5</span>
            </div>

            <div className="detail-price-row">
              <span className="detail-current-price">${product.price}</span>
              {product.originalPrice && (
                <span className="detail-original-price">${product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="detail-discount-badge">{product.discount}</span>
              )}
            </div>

            <p className="detail-description">
              {product.description ||
                "Crafted from premium quality breathable fabric, offering superior comfort and modern everyday style."}
            </p>

            <hr className="detail-divider" />

            <div className="attribute-section">
              <span className="attribute-label">Select Colors</span>
              <div className="color-swatches">
                {productColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    className="color-swatch-btn"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.id)}
                    aria-label={color.name}
                  >
                    {selectedColor === color.id && <FaCheck className="color-check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            <hr className="detail-divider" />

            <div className="attribute-section">
              <span className="attribute-label">Choose Size</span>
              <div className="size-options">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="detail-divider" />

            <div className="purchase-cta-row">
              <div className="quantity-counter">
                <button type="button" onClick={() => handleQuantity("dec")} aria-label="Decrease quantity">
                  <FaMinus />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button type="button" onClick={() => handleQuantity("inc")} aria-label="Increase quantity">
                  <FaPlus />
                </button>
              </div>

              <button type="button" className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            {addedToast && (
              <div className="cart-toast-alert">
                Item added to your shopping cart!
              </div>
            )}
          </div>
        </div>

        <div className="detail-tabs-header">
          <button
            type="button"
            className={`tab-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </button>
          <button
            type="button"
            className={`tab-link ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </button>
          <button
            type="button"
            className={`tab-link ${activeTab === "faqs" ? "active" : ""}`}
            onClick={() => setActiveTab("faqs")}
          >
            FAQs
          </button>
        </div>

        {activeTab === "reviews" && <ProductReviews totalReviewsCount={451} />}
        {activeTab === "details" && (
          <div style={{ padding: "2.5rem 0", color: "#555", lineHeight: 1.8 }}>
            <h3>Material & Specifications</h3>
            <p>{product.description || "100% Breathable Combed Cotton. Machine wash cold, tumble dry low."}</p>
          </div>
        )}
        {activeTab === "faqs" && (
          <div style={{ padding: "2.5rem 0", color: "#555", lineHeight: 1.8 }}>
            <h3>Frequently Asked Questions</h3>
            <p>Standard delivery takes 2-4 business days. 30-day hassle-free returns.</p>
          </div>
        )}
      </div>

      <RelatedProducts />
    </div>
  );
}

export default ProductDetail;