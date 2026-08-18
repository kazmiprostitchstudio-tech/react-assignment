import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { 
  RiVisaLine, 
  RiMastercardFill, 
  RiPaypalFill, 
  RiAppleFill, 
  RiGoogleFill 
} from "react-icons/ri";
import Newsletter from "../Newsletter/Newsletter";
import "./Footer.css";

const FOOTER_SECTIONS = [
  {
    title: "COMPANY",
    links: [
      { label: "About", to: "/about" },
      { label: "Features", to: "/features" },
      { label: "Works", to: "/works" },
      { label: "Career", to: "/career" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", to: "/support" },
      { label: "Delivery Details", to: "/delivery" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", to: "/account" },
      { label: "Manage Deliveries", to: "/deliveries" },
      { label: "Orders", to: "/orders" },
      { label: "Payments", to: "/payments" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Free eBooks", to: "/ebooks" },
      { label: "Development Tutorial", to: "/tutorials" },
      { label: "How to - Blog", to: "/blog" },
      { label: "Youtube Playlist", to: "/youtube" },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer-wrapper">
      {/* Floating Newsletter on Top of Footer */}
      <div className="footer-newsletter-wrapper">
        <Newsletter />
      </div>

      <div className="footer-main-content">
        <div className="footer-container">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              SHOP.CO
            </Link>
            <p className="footer-brand-desc">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="footer-social-links">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-icon-btn">
                <FaTwitter />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon-btn filled-social">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon-btn">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon-btn">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Columns 2-5: Dynamic Links */}
          <div className="footer-links-grid">
            {FOOTER_SECTIONS.map((sec, idx) => (
              <div key={idx} className="footer-links-col">
                <h4 className="footer-col-title">{sec.title}</h4>
                <ul className="footer-link-list">
                  {sec.links.map((item, i) => (
                    <li key={i}>
                      <Link to={item.to} className="footer-nav-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Legal Row */}
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          <div className="footer-payment-badges">
            <div className="payment-card-badge visa"><RiVisaLine /></div>
            <div className="payment-card-badge mastercard"><RiMastercardFill /></div>
            <div className="payment-card-badge paypal"><RiPaypalFill /></div>
            <div className="payment-card-badge applepay"><RiAppleFill /><span>Pay</span></div>
            <div className="payment-card-badge gpay"><RiGoogleFill /><span>Pay</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;