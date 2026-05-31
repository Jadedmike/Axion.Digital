import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Pricing } from '@/components/sections/pricing';
import { Portfolio } from '@/components/sections/portfolio';
import { Cta } from '@/components/sections/cta';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <Contact />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
