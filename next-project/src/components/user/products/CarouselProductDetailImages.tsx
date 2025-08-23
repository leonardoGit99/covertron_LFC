import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

type Props = {
  images: string[];
  handleClick: (selectedImage: string, index: number) => void;
};

export function CarouselProductDetailImages({ images, handleClick }: Props) {
  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className="w-full max-w-48 md:max-w-xl"
    >
      <CarouselContent className='flex items-center justify-center'>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/2 lg:basis-1/4"
          >
            <Card
              onClick={() => handleClick(image, index)}
              className="group transform transition-all duration-400 ease-out hover:scale-[1.02] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer rounded-lg overflow-hidden will-change-transform"
            >
              <CardContent className="p-0">
                <div className="relative w-full aspect-square">
                  <Image
                    src={image}
                    alt={`Imagen del producto ${index + 1}`}
                    fill
                    className="transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 object-cover rounded-lg"
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, 25vw"
                    priority={index === 0} // Prioridad para la primera imagen
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='-left-12'/>
      <CarouselNext className='-right-12'/>
    </Carousel>
  );
}
