import React from 'react';
import { StaticImageData } from 'next/image';
import ServiceCard from './ServiceCard';
import servicesOne from '../../../public/assets/services-1.jpg';
import servicesTwo from '../../../public/assets/services-2.jpg';
import servicesThree from '../../../public/assets/services-3.jpg';
import { FaLaptop, FaPalette } from 'react-icons/fa';
import { GiClothes } from 'react-icons/gi';
import HeaderSection from './HeaderSection';

export type Service = {
  title: string;
  description: string;
  image: string | StaticImageData;
};

const services: Service[] = [
  {
    title: 'Confección de estuches personalizados',
    description:
      'Creamos estuches para laptops de alta calidad, combinando materiales seleccionados y diseños únicos que protegen tus objetos con estilo.',
    image: servicesOne,
  },
  {
    title: 'Diseño de estuches exclusivos',
    description:
      'Cada funda es diseñada pensando en funcionalidad y elegancia, convirtiendo tus estuches en piezas únicas que cuentan su propia historia.',
    image: servicesTwo,
  },
  {
    title: 'Ropa de segunda mano seleccionada',
    description:
      'Seleccionamos cuidadosamente prendas de segunda mano, dándoles nueva vida y ofreciéndote opciones sostenibles para tu estilo diario.',
    image: servicesThree,
  },
];

function Services() {
  return (
    <section
      id="servicios"
      className="relative min-h-[auto] md:min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center mt-0 md:mt-10 px-4"
    >
      <HeaderSection
        title="Explora nuestros"
        description="COVERTRON&reg; combina funcionalidad y sostenibilidad: estuches premium para laptops y ropa de segunda mano lista para tu estilo. Desde Quillacollo, Cochabamba, llevamos nuestros productos a clientes de todo el país."
        highlightWord="Servicios"
        highlightColor="text-orange-500"
      />

      {/* Grid de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex justify-center"
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
