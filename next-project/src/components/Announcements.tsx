"use client"
import { link } from 'fs';
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { Card, CardContent } from './ui/card';
import Autoplay from "embla-carousel-autoplay"

type Announcement = {
  id: number;
  title: string;
  description: string;
  date?: string;
  link?: string;
}

type AnnouncementsProps = Announcement[];

function Announcements() {

  const announcements: AnnouncementsProps = [
    {
      id: 1,
      title: "🕘 Horarios de atención",
      description: "Atendemos de lunes a sábado, de 9:00 a 18:00 hrs",
      date: "2023-10-01",
      link: "#"
    },
    {
      id: 2,
      title: "💬 Compra por WhatsApp",
      description: "Ahora también puedes pedir por WhatsApp",
      date: "2023-11-15",
      link: "#"
    },
    {
      id: 3,
      title: "🏪 Retiro en tienda",
      description: "Recoge tu pedido en tienda sin costo adicional",
      link: "#"
    },
    {
      id: 4,
      title: "🚚 Envíos a todo el país",
      description: "Hacemos entregas a nivel nacional. ¡Recibe tu pedido donde estés!",
      link: "#"
    }, {
      id: 5,
      title: "💵 Pago contra entrega",
      description: "Disponible en zonas seleccionadas",
      link: "#"
    }
  ];

  return (
    <div className='bg-sky-950 dark:bg-primary'>
      <Carousel
        className='w-full max-w-7xl mx-auto'
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {
            announcements.map((ad) => (
              <CarouselItem key={ad.id} className='cursor-pointer'>
                <Card className='shadow-none border-none bg-transparent'>
                  <CardContent className='flex flex-col justify-center p-2 items-center'>
                    <p className='sm:text-lg text-wrap text-slate-50 dark:text-secondary font-semibold'>{ad.title}</p>
                    <p className='text-xs sm:text-sm text-wrap text-slate-300 dark:text-secondary'>{ad.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>

    </div>
  )
}

export default Announcements