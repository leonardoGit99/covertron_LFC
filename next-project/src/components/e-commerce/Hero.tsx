import React from 'react';
import Navbar from '../Navbar';
import { RiArrowDownDoubleFill } from 'react-icons/ri';
function Hero() {
  return (
    <>
      <div className="max-w-6xl">
        <Navbar type="transparent" />
      </div>
      <section
        className="relative h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/55" />{' '}
        {/* Overlay for darkening the background */}
        <div className="relative z-40 flex flex-col items-center justify-center h-full text-center text-white  max-w-6xl mx-auto">
          <h1 className="text-lg md:text-6xl mb-6 font-normal">
            Protege tu tecnología con estilo único y viste con moda que cuenta
            historias
          </h1>
          <p className="md:text-xl mb-16 max-w-3xl font-light">
            Explora, descubre y elige entre una amplia gama de fundas y ropas de
            segunda mano que reflejan tu personalidad
          </p>
          <button className="bg-white/70 text-black px-6 py-3 rounded-3xl hover:bg-gray-200 transition-all ease-out duration-300">
            <span className="flex items-center justify-center gap-1">
              <p className="font-medium">Conoce más sobre nosotros</p>
              <RiArrowDownDoubleFill className="text-xl animate-upDown" />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Hero;
