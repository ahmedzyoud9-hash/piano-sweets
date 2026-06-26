import Collections from "@/components/Collections";
import Enquiry from "@/components/Enquiry";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Occasions from "@/components/Occasions";
import Philosophy from "@/components/Philosophy";
import QuoteBanner from "@/components/QuoteBanner";
import Story from "@/components/Story";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Story />
      <Philosophy />
      <Founder />
      <Collections />
      <Gallery />
      <Occasions />
      <Enquiry />
      <QuoteBanner />
      <Footer />
    </>
  );
}
