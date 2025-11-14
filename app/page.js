import HeroSection from "./Components/HeroSection";
import AboutUsSection from "./Components/AboutUs";
import HowItWorksSection from "./Components/Howitworks";
import TestimonialsSection from "./Components/Testimonial";
import FAQSection from "./Components/Faq";
import Footer from "./Components/Footer";


export default function Home() {
  return (
    <div className="w-screen max-w-full overflow-x-hidden relative box-border">
      
      <HeroSection />

      <section id="about" className="w-full max-w-full overflow-x-hidden">
        <AboutUsSection />
      </section>

      <section id="how-it-works" className="w-full max-w-full overflow-x-hidden">
        <HowItWorksSection />
      </section>

      <section id="testimonials" className="w-full max-w-full overflow-x-hidden">
        <TestimonialsSection />
      </section>

      <section id="faq" className="w-full max-w-full overflow-x-hidden">
        <FAQSection />
      </section>

      <section id="footer" className="w-full max-w-full overflow-x-hidden">
        <Footer />
      </section>

    </div>
  );
}

