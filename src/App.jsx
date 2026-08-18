import { BrowserRouter as Router } from "react-router-dom";
import TopBanner from "./components/TopBanner/TopBanner";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Brands from "./components/Brands/Brands";
import NewArrivals from "./components/NewArrivals/NewArrivals";
import TopSelling from "./components/TopSelling/TopSelling";
import DressStyle from "./components/DressStyle/DressStyle";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopBanner />
        <Navbar />
        <Hero />
        <Brands />
        <NewArrivals />
        <TopSelling />
        <DressStyle />
      </div>
    </Router>
  );
}

export default App;