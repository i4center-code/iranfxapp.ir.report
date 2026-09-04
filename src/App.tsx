import { useEffect, useState } from "react";
import Courses from "./components/Courses";
import DownloadCta from "./components/DownloadCta";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import Robots from "./components/Robots";
import Ticker from "./components/Ticker";
import { IconUp } from "./components/icons";

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      aria-label="بازگشت به بالا"
      className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-mint text-abyss shadow-[0_12px_35px_-8px_rgba(62,207,154,0.8)] transition-all duration-500 hover:-translate-y-1 hover:brightness-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <IconUp className="h-5 w-5" />
    </a>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-fog">
      {/* layered ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-grid absolute inset-x-0 top-0 h-[900px]" />
        <div className="absolute -top-32 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full bg-pine/14 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-8%] h-[420px] w-[420px] rounded-full bg-mint/6 blur-[140px]" />
        <div className="absolute left-[-10%] top-[38%] h-[380px] w-[380px] rounded-full bg-gold/5 blur-[130px]" />
      </div>
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10">
        <Ticker />
        <Nav />
        <main>
          <Hero />
          <Robots />
          <Courses />
          <Pricing />
          <DownloadCta />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
