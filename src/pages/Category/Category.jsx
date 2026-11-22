import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheck,
  FaSlidersH,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "./Category.css";
import fallbackImg from "../../assets/products/product-1.png";

const CATEGORIES_LIST = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const COLORS_LIST = [
  { id: "green", hex: "#00C12B" },
  { id: "red", hex: "#F50606" },
  { id: "yellow", hex: "#F5DD06" },
  { id: "orange", hex: "#F57906" },
  { id: "cyan", hex: "#06CAF5" },
  { id: "blue", hex: "#063AF5" },
  { id: "purple", hex: "#7D06F5" },
  { id: "pink", hex: "#F506A4" },
  { id: "white", hex: "#FFFFFF" },
  { id: "black", hex: "#000000" },
];
const SIZES_LIST = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

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
  return <div className="category-stars">{stars}</div>;
}

function Category() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDressStyle, setSelectedDressStyle] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-e-commerce-admin-hk.vercel.app/api/products");
        const data = Array.isArray(res.data) ? res.data : res.data.products || [];
        setProducts(data);
        if (data.length > 0) {
          const highest = Math.max(...data.map((p) => Number(p.price) || 0), 250);
          setMaxPrice(highest);
        }
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const highestAvailablePrice = useMemo(() => {
    if (products.length === 0) return 500;
    return Math.max(...products.map((p) => Number(p.price) || 0), 250);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        if (
          selectedCategory !== "All" &&
          (item.category || "").toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
        if (
          selectedDressStyle !== "All" &&
          item.style &&
          item.style.toLowerCase() !== selectedDressStyle.toLowerCase()
        ) {
          return false;
        }
        if (Number(item.price) > maxPrice) return false;
        if (selectedColor && item.color && item.color.toLowerCase() !== selectedColor.toLowerCase()) {
          return false;
        }
        if (selectedSize && Array.isArray(item.sizes) && !item.sizes.includes(selectedSize)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return (b.popularity || 0) - (a.popularity || 0);
        if (sortBy === "low-high") return Number(a.price) - Number(b.price);
        if (sortBy === "high-low") return Number(b.price) - Number(a.price);
        if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
        return 0;
      });
  }, [products, selectedCategory, selectedDressStyle, maxPrice, selectedColor, selectedSize, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const currentDisplayed = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedDressStyle("All");
    setMaxPrice(highestAvailablePrice);
    setSelectedColor(null);
    setSelectedSize(null);
    setSortBy("popular");
    setCurrentPage(1);
  };

  return (
    <div className="category-page">
      <div className="category-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </span>
        </nav>

        <div className="category-layout">
          <aside className={`category-sidebar ${mobileFilterOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <h3>Filters</h3>
              <FaSlidersH className="filters-icon" />
              {mobileFilterOpen && (
                <button
                  type="button"
                  className="close-mobile-filter"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  ✕
                </button>
              )}
            </div>

            <hr className="filter-divider" />

            <ul className="category-filter-list">
              <li
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => {
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
              >
                <span>All Categories</span>
                <FaChevronRight className="cat-arrow" />
              </li>
              {CATEGORIES_LIST.map((cat) => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? "active" : ""}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  <span>{cat}</span>
                  <FaChevronRight className="cat-arrow" />
                </li>
              ))}
            </ul>

            <hr className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Price</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <div className="price-slider-box">
                <input
                  type="range"
                  min="0"
                  max={highestAvailablePrice}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="price-range-input"
                />
                <div className="price-values">
                  <span>$0</span>
                  <span className="current-max-price">${maxPrice}</span>
                </div>
              </div>
            </div>

            <hr className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Colors</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <div className="color-swatches-grid">
                {COLORS_LIST.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    className={`color-filter-btn ${color.id === "white" ? "border-swatch" : ""}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => {
                      setSelectedColor(selectedColor === color.id ? null : color.id);
                      setCurrentPage(1);
                    }}
                    aria-label={color.id}
                  >
                    {selectedColor === color.id && (
                      <FaCheck
                        className={`swatch-check ${
                          color.id === "white" || color.id === "yellow" ? "dark-check" : ""
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <hr className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Size</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <div className="size-pills-grid">
                {SIZES_LIST.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-pill-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => {
                      setSelectedSize(selectedSize === size ? null : size);
                      setCurrentPage(1);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <hr className="filter-divider" />

            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Dress Style</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <ul className="category-filter-list">
                <li
                  className={selectedDressStyle === "All" ? "active" : ""}
                  onClick={() => {
                    setSelectedDressStyle("All");
                    setCurrentPage(1);
                  }}
                >
                  <span>All Styles</span>
                  <FaChevronRight className="cat-arrow" />
                </li>
                {DRESS_STYLES.map((style) => (
                  <li
                    key={style}
                    className={selectedDressStyle === style ? "active" : ""}
                    onClick={() => {
                      setSelectedDressStyle(style);
                      setCurrentPage(1);
                    }}
                  >
                    <span>{style}</span>
                    <FaChevronRight className="cat-arrow" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="apply-filter-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filter
              </button>
              {(selectedCategory !== "All" ||
                selectedDressStyle !== "All" ||
                selectedColor ||
                selectedSize ||
                maxPrice < highestAvailablePrice) && (
                <button type="button" className="reset-filter-btn" onClick={handleResetFilters}>
                  Clear All
                </button>
              )}
            </div>
          </aside>

          <main className="category-main-content">
            <div className="category-top-bar">
              <div className="category-title-wrap">
                <h1 className="category-heading">
                  {selectedCategory === "All" ? "Shop" : selectedCategory}
                </h1>
                <span className="results-count-text">
                  Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
                  {filteredProducts.length} Products
                </span>
              </div>

              <div className="category-sort-wrap">
                <button
                  type="button"
                  className="mobile-filter-trigger"
                  onClick={() => setMobileFilterOpen(true)}
                  aria-label="Open Filters"
                >
                  <FaSlidersH />
                </button>

                <div className="sort-by-select-wrap">
                  <span className="sort-label">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="category-sort-dropdown"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <FaChevronDown className="sort-down-icon" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="no-products-found">
                <h3>Loading Products...</h3>
              </div>
            ) : currentDisplayed.length > 0 ? (
              <div className="category-product-grid">
                {currentDisplayed.map((product) => {
                  const productId = product._id || product.id;
                  const productImage = product.imageUrl || product.image || fallbackImg;
                  const productRating = product.rating || 4.5;

                  return (
                    <div key={productId} className="cat-product-card">
                      <Link to={`/product/${productId}`} className="cat-image-box">
                        <img
                          src={productImage}
                          alt={product.title}
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = fallbackImg;
                          }}
                        />
                      </Link>

                      <div className="cat-product-info">
                        <Link to={`/product/${productId}`} className="cat-product-title">
                          {product.title}
                        </Link>

                        <div className="cat-rating-row">
                          <StarRating rating={productRating} />
                          <span className="cat-rating-score">{productRating}/5</span>
                        </div>

                        <div className="cat-price-row">
                          <span className="cat-current-price">${product.price}</span>
                          {product.originalPrice && (
                            <span className="cat-original-price">${product.originalPrice}</span>
                          )}
                          {product.discount && (
                            <span className="cat-discount-badge">{product.discount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="no-products-found">
                <h3>No Products Matched</h3>
                <p>Try clearing some filters or changing your price range.</p>
                <button type="button" onClick={handleResetFilters}>
                  Reset Filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <>
                <hr className="pagination-divider" />
                <div className="pagination-wrapper">
                  <button
                    type="button"
                    className="page-nav-btn prev"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    <FaArrowLeft /> Previous
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={`page-num-btn ${currentPage === pageNum ? "active" : ""}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="page-nav-btn next"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  >
                    Next <FaArrowRight />
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Category;