import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBanner from "./components/TopBanner/TopBanner";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Global Header */}
        <TopBanner />
        <Navbar />

        {/* Dynamic Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Next pages will be connected here */}
        </Routes>

        {/* Global Footer with Newsletter */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;