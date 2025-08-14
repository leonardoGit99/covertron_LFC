import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image from 'next/image';
import image from '../../../public/assets/services-1.jpg';
import { Service } from './Services';

type Props ={
  service: Service
}

function WorkFlowCard({service}:Props) {
  return (
    <Card className=" w-[90vw] sm:w-[350px] overflow-hidden flex flex-col bg-background shadow-none rounded-none">
      <CardContent className="border-none">
        <div className="relative w-full aspect-square overflow-hidden">
          <Image
            src={service.image}
            alt="service image"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-2 gap-2">
        <p className="font-bold text-3xl text-gray-900">
          {service.title}
        </p>
        <p className="text-gray-500 text-lg text-justify leading-relaxed font-medium">
          {service.description}
        </p>
      </CardFooter>
    </Card>
  );
}

export default WorkFlowCard;
