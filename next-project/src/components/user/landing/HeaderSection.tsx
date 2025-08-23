import React from 'react';
import Reveal from '@/components/user/landing/Reveal';

type Props = {
  title: string;
  description: string;
  highlightWord: string;
  highlightColor: string;
};

function HeaderSection({
  title,
  description,
  highlightWord,
  highlightColor,
}: Props) {
  return (
    <Reveal direction="down">
      <div className="text-center mb-6">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-gray-800 dark:text-white/90 leading-tight">
          {title} <span className={`${highlightColor}`}>{highlightWord}</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-lg leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </Reveal>
  );
}

export default HeaderSection;
