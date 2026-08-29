import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Services from "../components/Services.jsx";
import Gallery from "../components/Gallery.jsx";
import WhyChoose from "../components/WhyChoose.jsx";
import FAQ from "../components/FAQ.jsx";
import Appointment from "../components/Appointment.jsx";
import Reviews from "../components/Reviews.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppFloat from "../components/WhatsAppFloat.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <WhyChoose />
        <FAQ />
        <Appointment />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
