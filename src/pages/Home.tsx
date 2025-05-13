
import MainLayout from "@/components/Layout/MainLayout";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Features from "@/components/Home/Features";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <Features />
    </MainLayout>
  );
};

export default Home;
