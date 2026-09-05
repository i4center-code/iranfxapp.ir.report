import { useEffect, useState } from "react";
import DownloadCta from "./components/DownloadCta";
import Features from "./components/Features";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import HeroShowcase from "./components/HeroShowcase";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import Reference from "./components/Reference";
import Services from "./components/Services";
import Shop from "./components/Shop";
import Ticker from "./components/Ticker";
import Why from "./components/Why";
import { IconUp } from "./components/icons";
import { CartProvider } from "./lib/cart";
import { I18nProvider } from "./lib/i18n";

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
      className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink shadow-[0_12px_35px_-8px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1 hover:brightness-95 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <IconUp className="h-5 w-5" />
    </a>
  );
}

export default function App() {
  return (
    <I18nProvider>
    <CartProvider>
      <div className="relative min-h-screen overflow-x-clip bg-ink text-fog">
        {/* پس‌زمینه محیطی لایه‌لایه — سورمه‌ای عمیق با هاله‌های نوری گسترده */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="bg-grid absolute inset-x-0 top-0 h-[1100px]" />
          <div className="absolute -top-48 left-1/2 h-[860px] w-[1150px] -translate-x-1/2 rounded-full bg-dusk/55 blur-[190px]" />
          <div className="absolute -right-56 top-[24%] h-[720px] w-[720px] rounded-full bg-dusk/45 blur-[180px]" />
          <div className="absolute -left-64 top-[52%] h-[680px] w-[680px] rounded-full bg-skyx/10 blur-[170px]" />
          <div className="absolute -bottom-72 right-[18%] h-[760px] w-[760px] rounded-full bg-dusk/50 blur-[190px]" />
          <div className="absolute bottom-[30%] left-[35%] h-[300px] w-[300px] rounded-full bg-pine/12 blur-[130px]" />
        </div>
        <div className="noise-overlay" aria-hidden />

        <div className="relative z-10">
          <Ticker />
          <Nav />
          <main>
            <HeroShowcase />
            <Why />
            <Services />
            <Reference />
            <Features />
            <Pricing />
            <DownloadCta />
            <FinalCta />
          </main>
          <Footer />
          <BackToTop />
          <Shop />
        </div>
      </div>
    </CartProvider>
    </I18nProvider>
  );
}
