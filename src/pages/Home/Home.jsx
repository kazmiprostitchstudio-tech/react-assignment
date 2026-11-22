import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://backend-e-commerce-admin-hk.vercel.app/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Products load karne mein masla aa raha hai. Backend check karein.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Loading Products from Database...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="home-container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Featured Products (MongoDB Atlas)</h1>
      
      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>Abhi koi product available nahi hai. Admin panel se product add karein!</p>
      ) : (
        <div 
          className="products-grid" 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "20px" 
          }}
        >
          {products.map((product) => (
            <div 
              key={product._id} 
              className="product-card" 
              style={{ 
                border: "1px solid #e0e0e0", 
                padding: "15px", 
                borderRadius: "8px", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                backgroundColor: "#fff"
              }}
            >
              <img 
                src={product.image || "https://via.placeholder.com/150"} 
                alt={product.title} 
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }} 
              />
              <h3 style={{ margin: "10px 0 5px 0" }}>{product.title}</h3>
              <p style={{ fontSize: "14px", color: "#666", height: "40px", overflow: "hidden" }}>
                {product.description}
              </p>
              <p style={{ fontWeight: "bold", color: "#27ae60", fontSize: "18px", margin: "10px 0" }}>
                ${product.price}
              </p>
              <p style={{ fontSize: "13px", color: "#888" }}>Category: {product.category}</p>
              <p style={{ fontSize: "13px", color: "#888" }}>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;