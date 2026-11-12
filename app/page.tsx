import { TripsProvider } from "@/lib/store";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TripsSection from "@/components/TripsSection";
import Concept from "@/components/Concept";
import VideoSection from "@/components/VideoSection";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import TripModal from "@/components/TripModal";
import Admin from "@/components/Admin";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <TripsProvider>
      <div className="poc">Prototype visuel – Dream &amp; Launch · Contenu d&apos;exemple</div>
      <Header />
      <main id="top">
        <Hero />
        <TripsSection />
        <Concept />
        <VideoSection />
        <Faq />
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} AC Road Trip</span>
          <span>
            Site réalisé par{" "}
            <a href="https://dreamlaunch.be" target="_blank" rel="noreferrer">
              Dream &amp; Launch
            </a>
          </span>
        </div>
      </footer>
      <TripModal />
      <Admin />
      <Toast />
    </TripsProvider>
  );
}
