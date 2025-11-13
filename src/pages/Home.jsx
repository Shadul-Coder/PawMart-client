import CategorySection from "../components/CategorySection/CategorySection";
import Hero from "../components/Hero/Hero";
import PetHeroesSection from "../components/PetHeroesSection/PetHeroesSection";
import RecentSection from "../components/RecentSection/RecentSection";
import WhyAdoptSection from "../components/WhyAdoptSection/WhyAdoptSection";

const Home = () => {
  return (
    <>
      <title>Home | PawMart</title>
      <Hero />
      <CategorySection />
      <RecentSection />
      <WhyAdoptSection />
      <PetHeroesSection />
    </>
  );
};

export default Home;
