import About from '@/components/user/landing/About';
import FrequentlyQuestions from '@/components/user/landing/FrequentlyQuestions';
import Hero from '@/components/user/landing/Hero';
import Reasons from '@/components/user/landing/Reasons';
import Services from '@/components/user/landing/Services';

export default function Home() {
  return (
    <>
      <div className="bg-background dark:bg-backgroundDark">
        <Hero />
        <Services />
        <About />
        <Reasons />
        <FrequentlyQuestions />
      </div>
    </>
  );
}
