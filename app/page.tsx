import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Philosophy from "@/components/Philosophy";
import Collections from "@/components/Collections";
import Process from "@/components/Process";
import Occasions from "@/components/Occasions";
import Quote from "@/components/Quote";
import Enquiry from "@/components/Enquiry";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <a href="#story" className="skip-link">تخطّي إلى المحتوى</a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Philosophy />
        <Collections />
        <Process />
        <Occasions />
        <Quote />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
