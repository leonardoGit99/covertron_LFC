'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

type Announcement = {
  id: number;
  image: string;
  alt: string;
};

function Announcements() {
  const announcements: Announcement[] = [
    { id: 1, image: '/assets/ad-1.jpg', alt: 'Anuncio 1' },
    { id: 2, image: '/assets/ad-2.jpg', alt: 'Anuncio 2' },
    { id: 3, image: '/assets/ad-3.jpg', alt: 'Anuncio 3' },
  ];

  return (
    <div className="bg-background dark:bg-backgroundDark mb-6 md:mb-3 flex justify-center items-center min-h-[auto] md:min-h-[calc(100vh-5.75rem)]">
      <Carousel
        className="w-full max-w-7xl mx-auto"
        opts={{ loop: true, duration: 50 }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {announcements.map((ad) => (
            <CarouselItem key={ad.id}>
              <Card className="shadow-none border-none bg-transparent roun-">
                <CardContent>
                  <div className="relative w-full aspect-[21/9] overflow-hidden">
                    <Image
                      src={ad.image}
                      alt={ad.alt}
                      fill
                      className="object-fill object-center"
                      sizes="100vw"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Announcements;
