import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import TrainingCourses from "@/components/TrainingCourses";
import WhyChooseUs from "@/components/WhyChooseUs";
import LearningJourney from "@/components/LearningJourney";
import RoadSafety from "@/components/RoadSafety";
import VehicleShowcase from "@/components/VehicleShowcase";
import Testimonials from "@/components/Testimonials";
import StudentGallery from "@/components/StudentGallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <TrainingCourses />
        <WhyChooseUs />
        <LearningJourney />
        <RoadSafety />
        <VehicleShowcase />
        <Testimonials />
        <StudentGallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileActionBar />
    </>
  );
}
