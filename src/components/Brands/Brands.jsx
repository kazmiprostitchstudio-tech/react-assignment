import "./Brands.css";

// Dynamic Brands Data (Backend / API Ready)
const DEFAULT_BRANDS = [
  { id: 1, name: "VERSACE", fontClass: "brand-versace", link: "/brands/versace" },
  { id: 2, name: "ZARA", fontClass: "brand-zara", link: "/brands/zara" },
  { id: 3, name: "GUCCI", fontClass: "brand-gucci", link: "/brands/gucci" },
  { id: 4, name: "PRADA", fontClass: "brand-prada", link: "/brands/prada" },
  { id: 5, name: "Calvin Klein", fontClass: "brand-calvin-klein", link: "/brands/calvin-klein" },
];

function Brands({ brands = DEFAULT_BRANDS }) {
  return (
    <section className="brands-strip" aria-label="Featured Brands">
      <div className="brands-container">
        {brands.map((brand) => (
          <div key={brand.id} className={`brand-item ${brand.fontClass}`}>
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Brands;