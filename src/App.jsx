import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import TopBanner from "./components/TopBanner/TopBanner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <TopBanner />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;