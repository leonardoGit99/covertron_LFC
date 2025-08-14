import About from '@/components/e-commerce/About';
import FrequentlyQuestions from '@/components/e-commerce/FrequentlyQuestions';
import Hero from '@/components/e-commerce/Hero';
import Reasons from '@/components/e-commerce/Reasons';
import Services from '@/components/e-commerce/Services';

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <Reasons/>
      <FrequentlyQuestions />
    </div>
  );
}
