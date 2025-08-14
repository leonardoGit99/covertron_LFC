'use client';
import React from 'react';
import Navbar from '../Navbar';
import { RiArrowDownDoubleFill } from 'react-icons/ri';
import Link from 'next/link';
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
          <h1 className="text-3xl sm:text-6xl mb-6 font-bold">
            Protege tu tecnología con estilo único y viste con moda que cuenta
            historias
          </h1>
          <p className="text-sm sm:text-xl mb-12 max-w-3xl font-light">
            Explora, descubre y elige entre una amplia gama de fundas y ropas de
            segunda mano que reflejan tu personalidad
          </p>
          <Link href={'#servicios'}>
            <div className="bg-white/45 text-black px-6 py-3 rounded-3xl hover:bg-gray-200 transition-all ease-out duration-300">
              <span className="flex flex-col items-center justify-center gap-1">
                <p className="text-sm md:text-lg text-gray-900">
                  Conoce más sobre nosotros
                </p>
              </span>
            </div>
          </Link>
          <RiArrowDownDoubleFill className="text-6xl animate-upDown absolute bottom-5" />
        </div>
      </section>
    </>
  );
}

export default Hero;
