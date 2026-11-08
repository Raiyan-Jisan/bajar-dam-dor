import AllProductsSection from "@/components/AllProductsSection";
import FareDecreaseSection from "@/components/FareDecreaseSection";
import FareIncreaseSection from "@/components/FareIncreaseSection";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FareIncreaseSection />
      <FareDecreaseSection />
      <AllProductsSection />
    </div>
  );
}