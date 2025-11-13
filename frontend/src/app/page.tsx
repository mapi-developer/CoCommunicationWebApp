import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SpacesGrid from "@/components/SpacesGrid";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <SpacesGrid />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
