import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
  FaArrowRight
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "./Category.css";

// Reuse Existing Assets
import p1 from "../../assets/products/product-1.png";
import p2 from "../../assets/products/product-2.png";
import p3 from "../../assets/products/product-3.png";
import p4 from "../../assets/products/product-4.png";
import p5 from "../../assets/products/product-5.png";
import p6 from "../../assets/products/product-6.png";
import p7 from "../../assets/products/product-7.png";
import p8 from "../../assets/products/product-8.png";
import rel1 from "../../assets/related/related-1.png";
import rel2 from "../../assets/related/related-2.png";
import rel3 from "../../assets/related/related-3.png";
import rel4 from "../../assets/related/related-4.png";

const CATEGORY_PRODUCTS = [
  {
    id: "gradient-graphic-tshirt",
    title: "Gradient Graphic T-shirt",
    category: "T-shirts",
    style: "Casual",
    image: rel2,
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 3.5,
    color: "white",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    popularity: 92,
  },
  {
    id: "polo-tipping-details",
    title: "Polo with Tipping Details",
    category: "Shirts",
    style: "Formal",
    image: rel3,
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    color: "pink",
    sizes: ["Medium", "Large", "X-Large", "XX-Large"],
    popularity: 88,
  },
  {
    id: "black-striped-tshirt",
    title: "Black Striped T-shirt",
    category: "T-shirts",
    style: "Casual",
    image: rel4,
    price: 120,
    originalPrice: 150,
    discount: "-30%",
    rating: 5.0,
    color: "black",
    sizes: ["Small", "Medium", "Large"],
    popularity: 98,
  },
  {
    id: "skinny-fit-jeans",
    title: "Skinny Fit Jeans",
    category: "Jeans",
    style: "Party",
    image: p2,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    rating: 3.5,
    color: "blue",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    popularity: 76,
  },
  {
    id: "checkered-shirt",
    title: "Checkered Shirt",
    category: "Shirts",
    style: "Formal",
    image: p3,
    price: 180,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    color: "red",
    sizes: ["Medium", "Large", "X-Large"],
    popularity: 85,
  },
  {
    id: "sleeve-striped-tshirt",
    title: "Sleeve Striped T-shirt",
    category: "T-shirts",
    style: "Gym",
    image: p4,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5,
    color: "orange",
    sizes: ["Small", "Large", "X-Large"],
    popularity: 90,
  },
  {
    id: "vertical-striped-shirt",
    title: "Vertical Striped Shirt",
    category: "Shirts",
    style: "Casual",
    image: p5,
    price: 212,
    originalPrice: 232,
    discount: "-20%",
    rating: 5.0,
    color: "green",
    sizes: ["Small", "Medium", "Large"],
    popularity: 95,
  },
  {
    id: "courage-graphic-tshirt",
    title: "Courage Graphic T-shirt",
    category: "T-shirts",
    style: "Casual",
    image: p6,
    price: 145,
    originalPrice: null,
    discount: null,
    rating: 4.0,
    color: "orange",
    sizes: ["Medium", "Large", "XX-Large"],
    popularity: 80,
  },
  {
    id: "loose-fit-bermuda-shorts",
    title: "Loose Fit Bermuda Shorts",
    category: "Shorts",
    style: "Gym",
    image: p7,
    price: 80,
    originalPrice: null,
    discount: null,
    rating: 3.0,
    color: "blue",
    sizes: ["Small", "Medium", "Large"],
    popularity: 70,
  },
  {
    id: "polo-contrast-trims",
    title: "Polo with Contrast Trims",
    category: "Shirts",
    style: "Formal",
    image: rel1,
    price: 212,
    originalPrice: 242,
    discount: "-20%",
    rating: 4.0,
    color: "cyan",
    sizes: ["Medium", "Large", "X-Large"],
    popularity: 83,
  },
  {
    id: "tshirt-tape-details",
    title: "T-shirt with Tape Details",
    category: "T-shirts",
    style: "Casual",
    image: p1,
    price: 120,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    color: "black",
    sizes: ["Small", "Medium", "Large", "X-Large"],
    popularity: 93,
  },
  {
    id: "faded-skinny-jeans",
    title: "Faded Skinny Jeans",
    category: "Jeans",
    style: "Party",
    image: p8,
    price: 210,
    originalPrice: null,
    discount: null,
    rating: 4.5,
    color: "black",
    sizes: ["Medium", "Large", "X-Large", "3X-Large"],
    popularity: 87,
  },
];

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
  "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"
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
  return <div className="category-stars">{stars}</div>;
}

function Category() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDressStyle, setSelectedDressStyle] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredProducts = useMemo(() => {
    return CATEGORY_PRODUCTS.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) return false;
      if (selectedDressStyle !== "All" && item.style !== selectedDressStyle) return false;
      if (item.price > maxPrice) return false;
      if (selectedColor && item.color !== selectedColor) return false;
      if (selectedSize && !item.sizes.includes(selectedSize)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "popular") return b.popularity - a.popularity;
      if (sortBy === "low-high") return a.price - b.price;
      if (sortBy === "high-low") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedDressStyle, maxPrice, selectedColor, selectedSize, sortBy]);

  const totalPages = Math.max(10, Math.ceil(filteredProducts.length / itemsPerPage) || 1);
  const currentDisplayed = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedDressStyle("All");
    setMaxPrice(250);
    setSelectedColor(null);
    setSelectedSize(null);
    setSortBy("popular");
    setCurrentPage(1);
  };

  return (
    <div className="category-page">
      <div className="category-container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FiChevronRight className="breadcrumb-arrow" />
          <span className="breadcrumb-current">Casual</span>
        </nav>

        <div className="category-layout">
          
          {/* Left Sidebar Filter Panel */}
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

            {/* Categories */}
            <ul className="category-filter-list">
              <li 
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }}
              >
                <span>All Categories</span>
                <FaChevronRight className="cat-arrow" />
              </li>
              {CATEGORIES_LIST.map((cat) => (
                <li
                  key={cat}
                  className={selectedCategory === cat ? "active" : ""}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                >
                  <span>{cat}</span>
                  <FaChevronRight className="cat-arrow" />
                </li>
              ))}
            </ul>

            <hr className="filter-divider" />

            {/* Price */}
            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Price</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <div className="price-slider-box">
                <input
                  type="range"
                  min="50"
                  max="260"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                  className="price-range-input"
                />
                <div className="price-values">
                  <span>$50</span>
                  <span className="current-max-price">${maxPrice}</span>
                </div>
              </div>
            </div>

            <hr className="filter-divider" />

            {/* Colors */}
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
                      <FaCheck className={`swatch-check ${color.id === "white" || color.id === "yellow" ? "dark-check" : ""}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <hr className="filter-divider" />

            {/* Size */}
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

            {/* Dress Style */}
            <div className="filter-group">
              <div className="filter-group-header">
                <h4>Dress Style</h4>
                <FaChevronUp className="accordion-icon" />
              </div>
              <ul className="category-filter-list">
                <li
                  className={selectedDressStyle === "All" ? "active" : ""}
                  onClick={() => { setSelectedDressStyle("All"); setCurrentPage(1); }}
                >
                  <span>All Styles</span>
                  <FaChevronRight className="cat-arrow" />
                </li>
                {DRESS_STYLES.map((style) => (
                  <li
                    key={style}
                    className={selectedDressStyle === style ? "active" : ""}
                    onClick={() => { setSelectedDressStyle(style); setCurrentPage(1); }}
                  >
                    <span>{style}</span>
                    <FaChevronRight className="cat-arrow" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="filter-actions">
              <button 
                type="button" 
                className="apply-filter-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filter
              </button>
              {(selectedCategory !== "All" || selectedDressStyle !== "All" || selectedColor || selectedSize || maxPrice < 250) && (
                <button type="button" className="reset-filter-btn" onClick={handleResetFilters}>
                  Clear All
                </button>
              )}
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="category-main-content">
            
            <div className="category-top-bar">
              <div className="category-title-wrap">
                <h1 className="category-heading">Casual</h1>
                <span className="results-count-text">
                  Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
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

            {currentDisplayed.length > 0 ? (
              <div className="category-product-grid">
                {currentDisplayed.map((product) => (
                  <div key={product.id} className="cat-product-card">
                    <Link to={`/product/${product.id}`} className="cat-image-box">
                      <img src={product.image} alt={product.title} loading="lazy" />
                    </Link>

                    <div className="cat-product-info">
                      <Link to={`/product/${product.id}`} className="cat-product-title">
                        {product.title}
                      </Link>

                      <div className="cat-rating-row">
                        <StarRating rating={product.rating} />
                        <span className="cat-rating-score">{product.rating}/5</span>
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
                ))}
              </div>
            ) : (
              <div className="no-products-found">
                <h3>No Products Matched</h3>
                <p>Try clearing some filters or changing your price range.</p>
                <button type="button" onClick={handleResetFilters}>Reset Filters</button>
              </div>
            )}

            <hr className="pagination-divider" />

            {/* Pagination Controls */}
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
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === 2 ? "active" : ""}`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === 3 ? "active" : ""}`}
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <span className="pagination-dots">...</span>
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === 8 ? "active" : ""}`}
                  onClick={() => setCurrentPage(8)}
                >
                  8
                </button>
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === 9 ? "active" : ""}`}
                  onClick={() => setCurrentPage(9)}
                >
                  9
                </button>
                <button 
                  type="button" 
                  className={`page-num-btn ${currentPage === totalPages ? "active" : ""}`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
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

          </main>

        </div>

      </div>
    </div>
  );
}

export default Category;