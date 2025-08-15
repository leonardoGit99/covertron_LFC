import React from 'react';
import ReasonCard from './ReasonCard';
import HeaderSection from './HeaderSection';

export type Reason = {
  number: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    number: '01',
    title: 'Estilo Personalizado',
    description:
      'Nuestros estuches se adaptan a tu estilo único, combinando funcionalidad y diseño.',
  },
  {
    number: '02',
    title: 'Sostenibilidad',
    description:
      'Promovemos un consumo responsable con ropa de segunda mano cuidadosamente seleccionada.',
  },
  {
    number: '03',
    title: 'Calidad Garantizada',
    description:
      'Utilizamos materiales de alta calidad para asegurar la durabilidad de nuestros productos.',
  },
];

function Reasons() {
  return (
    <section
      id="razones"
      className="min-h-[auto] md:min-h-screen max-w-7xl mx-auto px-4 py-10 md:py-16"
    >
      <HeaderSection
        title="Porque"
        description="En COVERTRON&reg; combinamos innovación, diseño y sostenibilidad. Nuestros estuches personalizados protegen tus dispositivos con estilo, mientras que nuestra ropa de segunda mano cuidadosamente seleccionada te ofrece opciones sostenibles y únicas."
        highlightWord="Elegirnos?"
        highlightColor="text-orange-500"
      />

      {/* Principal Content */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <ReasonCard
            key={index}
            reason={reason}
          />
        ))}
      </div>
    </section>
  );
}

export default Reasons;
