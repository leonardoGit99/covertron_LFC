import Image from 'next/image';
import React from 'react';
import HeaderSection from './HeaderSection';
import Reveal from './Reveal';

const statistics = [
  { title: 'Clientes Satisfechos', value: '35k+' },
  { title: 'Productos Vendidos', value: '40k+' },
  { title: 'Años de Experiencia', value: '10+' },
];

function About() {
  return (
    <section
      id="acerca-de"
      className="sm:max-w-6xl 2xl:max-w-7xl mx-auto px-4 mt:5 md:mt-10 min-h-[auto] md:min-h-screen "
    >
      <HeaderSection
        title="Conoce a"
        description=" En COVERTRON&reg; combinamos innovación y estilo para proteger tu portátil con estuches personalizados y duraderos. Además, promovemos
          un consumo responsable ofreciendo ropa de segunda mano cuidadosamente
          seleccionada."
        highlightWord="Covertron"
        highlightColor="text-orange-500"
      />

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* Imagen */}

        <div className="relative w-full md:w-1/3 min-h-[24rem] rounded-xl  overflow-hidden">
          <Image
            src="/assets/about.webp"
            alt="about image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out shadow-lg rounded-xl"
          />
        </div>

        {/* Texto y estadísticas */}
        <div className="flex-1 flex flex-col justify-stretch gap-6">
          {/* Estadísticas */}
          <Reveal
            direction="left"
            stagger={0.3}
            delay={0.1}
            className="grid grid-cols-2 sm:grid-cols-3 gap-6"
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center md:text-left shadow-md rounded-xl p-4 flex border-l-4 border-orange-200 rounded-l-xl bg-white/95 dark:bg-gray-900 dark:border-orange-700
                hover:-inset-1 dark:hover:shadow-white/80 dark:shadow-white/50 transition-all duration-500 ease-in-out"
              >
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <p className="text-gray-500 font-semibold text-normal dark:text-gray-300">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Misión y Visión */}
          <Reveal
            direction="left"
            stagger={0.3}
            delay={0.1}
            className="space-y-6"
          >
            <div className="relative overflow-hidden p-6 rounded-xl shadow-md bg-gradient-to-b from-white to-orange-50 dark:bg-none hover:shadow-lg transform transition-all duration-500 ease-in-out dark:bg-gray-900 dark:shadow-white/50 dark:hover:shadow-white/80 dark:border dark:border-white/30">
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Misión
              </h2>
              <p className="text-gray-500 leading-relaxed text-justify dark:text-gray-300 text-sm">
                En Covertron protegemos y potenciamos la movilidad de tus
                dispositivos con estuches innovadores, personalizados y de alta
                calidad que combinan diseño y funcionalidad. Además, impulsamos
                la moda sostenible ofreciendo ropa de segunda mano seleccionada,
                dando nueva vida a prendas únicas y fomentando el consumo
                responsable.
              </p>
            </div>
            <div className="relative overflow-hidden p-6 rounded-xl shadow-md bg-gradient-to-b from-white/90 to-orange-50  dark:bg-none hover:shadow-lg transform transition-all duration-500 ease-in-out dark:bg-gray-900 dark:shadow-white/50 dark:hover:shadow-white/80 dark:border dark:border-white/30">
              <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Visión
              </h2>
              <p className="text-gray-500 leading-relaxed text-justify dark:text-gray-300 text-sm">
                Ser líderes en estuches para portátiles, reconocidos por nuestra
                personalización, durabilidad e innovación. Al mismo tiempo,
                inspirar el consumo consciente con ropa de segunda mano de alta
                calidad, reduciendo el impacto ambiental y contando historias a
                través de cada prenda.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default About;
