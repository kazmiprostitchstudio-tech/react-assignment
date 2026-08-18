import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiTrash2, FiTag, FiArrowRight } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";

import p2 from "../../assets/products/product-2.png";
import p3 from "../../assets/products/product-3.png";
import p4 from "../../assets/products/product-4.png";

const INITIAL_CART = [
  {
    id: "gradient-graphic-tshirt",
    title: "Gradient Graphic T-shirt",
    size: "Large",
    color: "White",
    price: 145,
    quantity: 1,
    image: p4,
  },
  {
    id: "checkered-shirt",
    title: "Checkered Shirt",
    size: "Medium",
    color: "Red",
    price: 180,
    quantity: 1,
    image: p3,
  },
  {
    id: "skinny-fit-jeans",
    title: "Skinny Fit Jeans",
    size: "Large",
    color: "Blue",
    price: 240,
    quantity: 1,
    image: p2,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("shopco_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      }
      return INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(20);
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });

  const updateStorage = (updated) => {
    setCartItems(updated);
    localStorage.setItem("shopco_cart", JSON.stringify(updated));
  };

  const handleQuantity = (index, type) => {
    const updated = [...cartItems];
    if (type === "dec" && updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else if (type === "inc") {
      updated[index].quantity += 1;
    }
    updateStorage(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    updateStorage(updated);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.trim().toUpperCase() === "SHOP20") {
      setDiscountPercent(20);
      setPromoMessage({ type: "success", text: "20% discount applied successfully!" });
    } else {
      setPromoMessage({ type: "error", text: "Invalid promo code. Try 'SHOP20'" });
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <div className="cart-page">
      <div className="cart-container">
        
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">Cart</span>
        </nav>

        <h1 className="cart-heading">YOUR CART</h1>

        {cartItems.length > 0 ? (
          <div className="cart-layout-grid">
            
            <div className="cart-items-box">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  <article className="cart-item-card">
                    <div className="cart-item-img-wrap">
                      <img src={item.image || p4} alt={item.title} />
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-top-row">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <button
                          type="button"
                          className="delete-item-btn"
                          onClick={() => handleRemoveItem(index)}
                          aria-label="Remove item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      <p className="cart-item-meta">
                        Size: <span>{item.size || "Large"}</span>
                      </p>
                      <p className="cart-item-meta">
                        Color: <span>{item.color || "White"}</span>
                      </p>

                      <div className="cart-item-bottom-row">
                        <span className="cart-item-price">${item.price}</span>

                        <div className="cart-quantity-pill">
                          <button
                            type="button"
                            onClick={() => handleQuantity(index, "dec")}
                            aria-label="Decrease quantity"
                          >
                            <FaMinus />
                          </button>
                          <span className="cart-qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleQuantity(index, "inc")}
                            aria-label="Increase quantity"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  {index < cartItems.length - 1 && <hr className="cart-item-divider" />}
                </div>
              ))}
            </div>

            <aside className="order-summary-box">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-rows-group">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-val-dark">${subtotal}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Discount (-{discountPercent}%)</span>
                  <span className="summary-val-red">-${discountAmount}</span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Delivery Fee</span>
                  <span className="summary-val-dark">${deliveryFee}</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row total-row">
                  <span className="summary-total-label">Total</span>
                  <span className="summary-total-val">${grandTotal}</span>
                </div>
              </div>

              <form className="promo-code-form" onSubmit={handleApplyPromo}>
                <div className="promo-input-wrapper">
                  <FiTag className="promo-tag-icon" />
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                </div>
                <button type="submit" className="promo-apply-btn">
                  Apply
                </button>
              </form>

              {promoMessage.text && (
                <div className={`promo-feedback ${promoMessage.type}`}>
                  {promoMessage.text}
                </div>
              )}

              <button
                type="button"
                className="checkout-btn"
                onClick={() => alert("Proceeding to payment...")}
              >
                <span>Go to Checkout</span>
                <FiArrowRight className="checkout-arrow" />
              </button>
            </aside>

          </div>
        ) : (
          <div className="empty-cart-state">
            <h2>Your cart is empty!</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/category/casual" className="continue-shopping-btn">
              Explore Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;