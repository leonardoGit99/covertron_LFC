import Image from 'next/image';
import React from 'react';

const statistics = [
  { title: 'Clientes Satisfechos', value: '35k+' },
  { title: 'Productos Vendidos', value: '40k+' },
  { title: 'Años de Experiencia', value: '10+' },
];

function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      {/* Título y descripción */}
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl mb-4 text-gray-900 leading-tight">
          Conoce a <span className="text-elegant">Covertron</span>
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
          En COVERTRON&reg; combinamos innovación y estilo para proteger tu
          portátil con estuches personalizados y duraderos. Además, promovemos
          un consumo responsable ofreciendo ropa de segunda mano cuidadosamente
          seleccionada.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* Imagen */}
        <div className="relative w-full md:w-1/3 min-h-[24rem] rounded-xl shadow-lg overflow-hidden ">
          <Image
            src="/assets/about.webp"
            alt="about image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Texto y estadísticas */}
        <div className="flex-1 flex flex-col justify-stretch gap-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center md:text-left shadow-md rounded-xl p-4 bg-white/60 flex border-l-4 border-blue-900 hover:bg-sky-50 transition-colors duration-500 ease-in-out "
              >
                <div className='flex-1'>
                  <h2 className="text-4xl font-bold">{stat.value}</h2>
                  <p className="text-gray-500 font-semibold text-lg">
                    {stat.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Misión y Visión */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl shadow-md bg-white/60 hover:bg-sky-50 transition-colors duration-500 ease-in-out">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Misión</h2>
              <p className="text-gray-500 leading-relaxed text-justify">
                En Covertron protegemos y potenciamos la movilidad de tus
                dispositivos con estuches innovadores, personalizados y de alta
                calidad que combinan diseño y funcionalidad. Además, impulsamos
                la moda sostenible ofreciendo ropa de segunda mano seleccionada,
                dando nueva vida a prendas únicas y fomentando el consumo
                responsable.
              </p>
            </div>
            <div className="p-6 rounded-xl shadow-md bg-white/60 hover:bg-sky-50 transition-colors duration-500 ease-in-out">
              <h2 className="text-xl font-bold mb-2 text-gray-900">Visión</h2>
              <p className="text-gray-500 leading-relaxed text-justify">
                Ser líderes en estuches para portátiles, reconocidos por nuestra
                personalización, durabilidad e innovación. Al mismo tiempo,
                inspirar el consumo consciente con ropa de segunda mano de alta
                calidad, reduciendo el impacto ambiental y contando historias a
                través de cada prenda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
