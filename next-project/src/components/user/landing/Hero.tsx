'use client';
import React from 'react';
import Navbar from '@/components/user/common/Navbar';
import { RiArrowDownDoubleFill } from 'react-icons/ri';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import Reveal from '@/components/user/landing/Reveal';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';

function Hero() {
  const wppNumber = '+591XXXXXXXX';
  const handleWhatsappClick = () => {
    const defaultMessage = `Hola! Visité su página web y me interesa obtener más información sobre sus productos. ¿Podrían ayudarme?`;
    window.open(
      `https://wa.me/${wppNumber}?text=${encodeURIComponent(defaultMessage)}`
    );
  };

  const handleSocialMediaClick = (
    socialMedia: 'tiktok' | 'instagram' | 'facebook'
  ) => {
    if (socialMedia === 'tiktok') {
      window.open(`https://covertron.com`);
    } else if (socialMedia === 'instagram') {
      window.open(`open instagram`);
    } else {
      window.open(`open facebook`);
    }
  };

  return (
    <>
      <div className="max-w-6xl">
        <Navbar type="transparent" />
      </div>

      <section className="relative h-screen w-full">
        {/* Imagen de fondo optimizada */}
        <Image
          src="/assets/hero.jpg"
          alt="Hero"
          fill
          priority // carga inmediata
          className="object-cover object-center"
        />

        {/* Overlay para oscurecer la imagen */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Contenido */}
        <div className="relative z-40 flex flex-col items-center justify-center h-full text-center text-white max-w-7xl mx-auto px-6 md:px-0">
          <Reveal
            direction="down"
            distance={100}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-6 font-bold">
              Protege <span className='text-[#1abc9c]'>tu tecnología </span> con estilo único y viste con moda que cuenta
              <span className='text-[#1abc9c]'> historias</span>
            </h1>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.3}
            distance={100}
          >
            <p className="text-lg sm:text-xl mb-6 max-w-3xl font-light">
              Explora, descubre y elige entre una amplia gama de fundas y ropas
              de segunda mano que reflejan tu personalidad
            </p>
          </Reveal>

          <Reveal
            direction="left"
            delay={0}
            distance={50}
            stagger={0.2}
            className="flex items-center gap-4 px-10 mb-12"
          >
            <FaTiktok
              className="text-white md:text-2xl cursor-pointer hover:-translate-y-1 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => handleSocialMediaClick('tiktok')}
            />
            <FaFacebook
              className="text-white md:text-2xl cursor-pointer hover:-translate-y-1 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => handleSocialMediaClick('facebook')}
            />
            <FaInstagram
              className="text-white md:text-2xl cursor-pointer hover:-translate-y-1 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => handleSocialMediaClick('instagram')}
            />
          </Reveal>

          <div
            className="cursor-pointer"
            onClick={handleWhatsappClick}
          >
            <Reveal
              direction="up"
              delay={0.5}
            >
              <div className="bg-white/60 text-black px-6 py-3 rounded-3xl hover:bg-gray-200 transition-all ease-out duration-300">
                <span className="flex flex-col items-center justify-center gap-1">
                  <p className="flex items-center text-xs md:text-sm text-gray-900">
                    <FaWhatsapp className="mr-2 text-lg" />
                    Contáctanos por WhatsApp
                  </p>
                </span>
              </div>
            </Reveal>
          </div>

          <Link
            href={'#servicios'}
            className="absolute bottom-5"
          >
            <Reveal
              direction="down"
              delay={0.5}
            >
              <RiArrowDownDoubleFill className="text-6xl animate-upDown" />
            </Reveal>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Hero;
