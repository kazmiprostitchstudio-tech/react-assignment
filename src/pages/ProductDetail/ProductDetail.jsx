import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import "./ProductDetail.css";

import img1 from "../../assets/product-detail/detail-1.png";
import img2 from "../../assets/product-detail/detail-2.png";
import img3 from "../../assets/product-detail/detail-3.png";

const PRODUCT_DATA = {
  id: "one-life-graphic-tshirt",
  title: "ONE LIFE GRAPHIC T-SHIRT",
  rating: 4.5,
  price: 260,
  originalPrice: 300,
  discount: "-40%",
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  images: [img1, img2, img3],
  colors: [
    { id: "olive", hex: "#4F4631", name: "Olive Green" },
    { id: "forest", hex: "#314F4A", name: "Forest Green" },
    { id: "navy", hex: "#2C3049", name: "Dark Navy" },
  ],
  sizes: ["Small", "Medium", "Large", "X-Large"],
};

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
  return <div className="detail-stars">{stars}</div>;
}

function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(PRODUCT_DATA.images[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCT_DATA.colors[0].id);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");
  const [addedToast, setAddedToast] = useState(false);

  // Quantity Handlers
  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  // Add To Cart (LocalStorage Integration)
  const handleAddToCart = () => {
    const cartItem = {
      id: PRODUCT_DATA.id,
      title: PRODUCT_DATA.title,
      price: PRODUCT_DATA.price,
      image: selectedImage,
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

    // Show feedback toast
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <Link to="/shop">Shop</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <Link to="/category/men">Men</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">T-shirts</span>
        </nav>

        {/* Main Product Showcase */}
        <div className="product-main-grid">
          
          {/* Left Gallery: Vertical Thumbnails + Big View */}
          <div className="product-gallery">
            <div className="thumbnail-list">
              {PRODUCT_DATA.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumbnail-btn ${selectedImage === img ? "active" : ""}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>

            <div className="main-image-display">
              <img src={selectedImage} alt={PRODUCT_DATA.title} />
            </div>
          </div>

          {/* Right Column: Details & Purchase Actions */}
          <div className="product-actions-info">
            <h1 className="detail-product-title">{PRODUCT_DATA.title}</h1>

            <div className="detail-rating-row">
              <StarRating rating={PRODUCT_DATA.rating} />
              <span className="detail-rating-score">{PRODUCT_DATA.rating}/5</span>
            </div>

            <div className="detail-price-row">
              <span className="detail-current-price">${PRODUCT_DATA.price}</span>
              <span className="detail-original-price">${PRODUCT_DATA.originalPrice}</span>
              <span className="detail-discount-badge">{PRODUCT_DATA.discount}</span>
            </div>

            <p className="detail-description">{PRODUCT_DATA.description}</p>

            <hr className="detail-divider" />

            {/* Select Colors */}
            <div className="attribute-section">
              <span className="attribute-label">Select Colors</span>
              <div className="color-swatches">
                {PRODUCT_DATA.colors.map((color) => (
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

            {/* Choose Size */}
            <div className="attribute-section">
              <span className="attribute-label">Choose Size</span>
              <div className="size-options">
                {PRODUCT_DATA.sizes.map((size) => (
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

            {/* Quantity Counter & Add To Cart Button */}
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

        {/* Tab Navigation (Product Details / Reviews / FAQs) */}
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

        {/* Dynamic Tab Contents */}
        {activeTab === "reviews" && <ProductReviews totalReviewsCount={451} />}
        {activeTab === "details" && (
          <div style={{ padding: "2.5rem 0", color: "#555", lineHeight: 1.8 }}>
            <h3>Material & Specifications</h3>
            <p>100% Breathable Combed Cotton. Machine wash cold, tumble dry low.</p>
          </div>
        )}
        {activeTab === "faqs" && (
          <div style={{ padding: "2.5rem 0", color: "#555", lineHeight: 1.8 }}>
            <h3>Frequently Asked Questions</h3>
            <p>Standard delivery takes 2-4 business days. 30-day hassle-free returns.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductDetail;