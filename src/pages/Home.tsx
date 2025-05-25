import MainLayout from "@/components/Layout/MainLayout";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Features from "@/components/Home/Features";
import Team from "@/components/Home/Team";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <Features />
      <Team />
    </MainLayout>
  );
};

export default Home;
