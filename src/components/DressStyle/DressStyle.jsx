import { Link } from "react-router-dom";
import "./DressStyle.css";

import casualImg from "../../assets/styles/style-casual.png";
import formalImg from "../../assets/styles/style-formal.png";
import partyImg from "../../assets/styles/style-party.png";
import gymImg from "../../assets/styles/style-gym.png";

const STYLES_DATA = [
  {
    id: "casual",
    title: "Casual",
    image: casualImg,
    link: "/category/casual",
    gridClass: "style-card-short",
  },
  {
    id: "formal",
    title: "Formal",
    image: formalImg,
    link: "/category/formal",
    gridClass: "style-card-wide",
  },
  {
    id: "party",
    title: "Party",
    image: partyImg,
    link: "/category/party",
    gridClass: "style-card-wide",
  },
  {
    id: "gym",
    title: "Gym",
    image: gymImg,
    link: "/category/gym",
    gridClass: "style-card-short",
  },
];

function DressStyle() {
  return (
    <section className="dress-style-section" aria-label="Browse by Dress Style">
      <div className="dress-style-container">
        
        <div className="dress-style-box">
          <h2 className="dress-style-heading">BROWSE BY DRESS STYLE</h2>

          <div className="dress-style-grid">
            {STYLES_DATA.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className={`dress-style-card ${item.gridClass}`}
                aria-label={`Browse ${item.title} style`}
              >
                <img
                  src={item.image}
                  alt={`${item.title} Fashion Style`}
                  className="dress-style-image"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DressStyle;