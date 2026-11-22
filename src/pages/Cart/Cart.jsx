import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiChevronRight, FiTrash2, FiTag, FiArrowRight, FiX, FiCheckCircle } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./Cart.css";
import p4 from "../../assets/products/product-4.png";

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("shopco_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ type: "", text: "" });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

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

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setPlacingOrder(true);
    try {
      const payload = {
        customerDetails: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          phone: customerPhone.trim(),
          city: customerCity.trim(),
          address: customerAddress.trim(),
        },
        orderItems: cartItems.map((item) => ({
          product: item.id,
          title: item.title,
          price: Number(item.price),
          quantity: item.quantity,
          size: item.size || "Large",
          color: item.color || "Default",
          image: item.image || "",
        })),
        totalAmount: grandTotal,
        paymentMethod,
      };

      const res = await axios.post(
        "https://backend-e-commerce-admin-hk.vercel.app/api/orders",
        payload
      );

      if (res.data && res.data.success) {
        setOrderSuccess(res.data.order);
        updateStorage([]);
        setIsCheckoutOpen(false);
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setCustomerCity("");
        setCustomerAddress("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">Cart</span>
        </nav>

        <h1 className="cart-heading">YOUR CART</h1>

        {orderSuccess && (
          <div
            style={{
              background: "#ecfdf5",
              border: "1px solid #10b981",
              borderRadius: "16px",
              padding: "24px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            <FiCheckCircle size={40} color="#059669" />
            <h2 style={{ margin: "10px 0 6px", color: "#065f46" }}>
              Order Placed Successfully!
            </h2>
            <p style={{ color: "#047857", marginBottom: "12px" }}>
              Order ID: <strong>{orderSuccess._id}</strong> — Confirmation email has been sent to your inbox!
            </p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        )}

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

                {discountPercent > 0 && (
                  <div className="summary-row">
                    <span className="summary-label">Discount (-{discountPercent}%)</span>
                    <span className="summary-val-red">-${discountAmount}</span>
                  </div>
                )}

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
                    placeholder="Add promo code (SHOP20)"
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
                onClick={() => setIsCheckoutOpen(true)}
              >
                <span>Go to Checkout</span>
                <FiArrowRight className="checkout-arrow" />
              </button>
            </aside>
          </div>
        ) : (
          !orderSuccess && (
            <div className="empty-cart-state">
              <h2>Your cart is empty!</h2>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="continue-shopping-btn">
                Explore Products
              </Link>
            </div>
          )
        )}

        {isCheckoutOpen && (
          <div
            onClick={() => setIsCheckoutOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "16px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "28px",
                width: "100%",
                maxWidth: "480px",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "18px",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "22px" }}>Complete Your Order</h2>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "22px",
                    cursor: "pointer",
                  }}
                >
                  <FiX />
                </button>
              </div>

              <form onSubmit={handlePlaceOrder} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                />
                <input
                  type="email"
                  placeholder="Email Address (for confirmation mail) *"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  required
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                />
                <input
                  type="text"
                  placeholder="City *"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  required
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                />
                <textarea
                  placeholder="Complete Delivery Address *"
                  rows="3"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ padding: "12px", borderRadius: "10px", border: "1px solid #ddd" }}
                >
                  <option value="Cash on Delivery">Cash on Delivery (COD)</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>

                <div
                  style={{
                    background: "#f8f8f8",
                    padding: "12px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "700",
                  }}
                >
                  <span>Payable Total:</span>
                  <span>${grandTotal}</span>
                </div>

                <button
                  type="submit"
                  className="checkout-btn"
                  disabled={placingOrder}
                  style={{ marginTop: "6px" }}
                >
                  <span>{placingOrder ? "Placing Order..." : "Confirm & Place Order"}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;