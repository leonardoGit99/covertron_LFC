import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Service } from '@/components/user/landing/Services';

type Props ={
  service: Service
}

function ServiceCard({service}:Props) {
  return (
    <Card className=" w-[90vw] sm:w-[300px] overflow-hidden flex flex-col bg-background dark:bg-backgroundDark shadow-none rounded-xl group">
      <CardContent className="border-none rounded-xl shadow-lg">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl">
          <Image
            src={service.image}
            alt="service image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-2 gap-2">
        <p className="font-bold text-2xl text-gray-800 dark:text-white">
          {service.title}
        </p>
        <p className="text-gray-500 dark:text-gray-300 text-normal text-justify leading-relaxed font-medium">
          {service.description}
        </p>
      </CardFooter>
    </Card>
  );
}

export default ServiceCard;
