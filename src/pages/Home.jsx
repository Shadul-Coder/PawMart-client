import CategorySection from "../components/CategorySection/CategorySection";
import FAQ from "../components/FAQ/FAQ";
import Hero from "../components/Hero/Hero";
import RecentSection from "../components/RecentSection/RecentSection";
import WhyAdoptSection from "../components/WhyAdoptSection/WhyAdoptSection";

const Home = () => {
  return (
    <>
      <title>Home | PawMart</title>
      <div className="space-y-10 sm:space-y-11 md:space-y-13 lg:space-y-15 py-9 sm:py-11 md:py-13 lg:py-15">
        <Hero />
        <CategorySection />
        <RecentSection />
        <WhyAdoptSection />
        <section className="max-w-7xl mx-auto w-[95%] cursor-default lg:w-[97%]">
          <FAQ />
        </section>
      </div>
    </>
  );
};

export default Home;
