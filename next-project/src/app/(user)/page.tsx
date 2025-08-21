import About from '@/components/user/About';
import FrequentlyQuestions from '@/components/user/FrequentlyQuestions';
import Hero from '@/components/user/Hero';
import Navbar from '@/components/user/Navbar';
import Reasons from '@/components/user/Reasons';
import Services from '@/components/user/Services';

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
