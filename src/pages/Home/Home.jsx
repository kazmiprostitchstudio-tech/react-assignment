import Hero from "../../components/Hero/Hero";
import Brands from "../../components/Brands/Brands";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import TopSelling from "../../components/TopSelling/TopSelling";
import DressStyle from "../../components/DressStyle/DressStyle";
import Testimonials from "../../components/Testimonials/Testimonials";

function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <Testimonials />
    </main>
  );
}

export default Home;