import React from 'react';
import { Reason } from './Reasons';

type Props = {
  reason: Reason
}

function ReasonCard({reason}: Props) {
   return (
    <div 
      className={`
        group relative flex flex-col gap-6 p-8 rounded-2xl 
        bg-gradient-to-r from-white to-sky-50 border-2 border-gray-100
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 ease-out
        items-center justify-center overflow-hidden shadow-xl
      `}
      role="article"
      aria-labelledby={`reason-title-${reason.number}`}
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-75 transition-opacity duration-300"/>
      
      {/* Number badge */}
      <div className={`
        relative flex justify-center items-center 
        h-20 w-20 rounded-2xl text-white font-bold text-2xl
        shadow-lg group-hover:shadow-xl group-hover:scale-110
        transition-all duration-300 ease-out bg-sky-600
      `}>
        <span className="relative z-10 text-3xl">{reason.number}</span>
        
        {/* Badge shine effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-3 text-center flex-1">
        <h3 
          id={`reason-title-${reason.number}`}
          className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-gray-800 transition-colors duration-300"
        >
          {reason.title}
        </h3>
        
        <p className="text-base lg:text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 max-w-xs">
          {reason.description}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-sky-300 via-current to-sky-300 opacity-0 group-hover:w-1/2 group-hover:opacity-60 transition-all duration-300 ease-out"/>
    </div>
  );
}

export default ReasonCard;
