import React from 'react';
import CustomAccordion from './CustomAccordion';
import HeaderSection from './HeaderSection';
import Reveal from './Reveal';

export type Question = {
  question: string;
  answer: string;
};

const questions: Question[] = [
  {
    question: '¿Qué materiales se utilizan en los estuches personalizados?',
    answer:
      'Utilizamos materiales de alta calidad como cuero sintético, silicona y plástico resistente para garantizar la durabilidad y protección de tus dispositivos.',
  },
  {
    question: '¿Cómo puedo personalizar mi estuche?',
    answer:
      'Puedes elegir entre una variedad de colores, diseños y agregar texto o imágenes para hacer tu estuche único. Nuestro equipo de diseño te ayudará a crear el estuche perfecto.',
  },
  {
    question:
      '¿Cuál es el tiempo de entrega para los productos personalizados?',
    answer:
      'El tiempo de entrega estándar es de 7-10 días hábiles. Sin embargo, los tiempos pueden variar según la complejidad del diseño y la ubicación del envío.',
  },
  {
    question: '¿Ofrecen garantía en sus productos?',
    answer:
      'Sí, ofrecemos una garantía de 30 días para defectos de fabricación. Si tienes algún problema con tu producto, contáctanos y estaremos encantados de ayudarte.',
  },
  {
    question: '¿Cómo puedo realizar un pedido?',
    answer:
      'Puedes realizar tu pedido directamente a través de nuestro sitio web. Simplemente selecciona el producto, personalízalo y sigue las instrucciones para completar tu compra.',
  },
];

function FrequentlyQuestions() {
  return (
    <section
      id="preguntas-frecuentes"
      className="min-h-[auto] md:min-h-[calc(100vh-280px)] mx-w-7xl sm:max-w-6xl 2xl:max-w-7xl mx-auto "
    >
      <HeaderSection
        title="Preguntas"
        description="Todo lo que necesitas saber sobre COVERTRON&reg; y nuestros productos,
        explicado de manera clara y sencilla."
        highlightWord="Frecuentes"
        highlightColor="text-orange-500"
      />

      {/* Frequently questions Acordion */}
      <Reveal>
        <div className="max-w-3xl md:mx-auto mx-6 bg-white/50 rounded-lg shadow-xl dark:bg-gray-900 dark:border dark:border-white/30 h-[20rem] overflow-y-scroll">
          <CustomAccordion questions={questions} />
        </div>
      </Reveal>
    </section>
  );
}

export default FrequentlyQuestions;
