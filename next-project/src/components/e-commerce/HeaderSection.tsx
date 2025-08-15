import React from 'react';

type Props = {
  title: string;
  description: string;
  highlightWord: string;
  highlightColor: string;
};

function HeaderSection({title, description, highlightWord, highlightColor}: Props) {
  return (
    <div className="text-center mb-8">
      <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-gray-900 dark:text-white/90 leading-tight">
        {title} <span className={`${highlightColor}`}>{highlightWord}</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
}

export default HeaderSection;
