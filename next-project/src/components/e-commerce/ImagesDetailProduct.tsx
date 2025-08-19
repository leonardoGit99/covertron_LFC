'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CarouselProductDetailImages } from './CarouselProductDetailImages';

type Props = {
  images: string[];
};

function ImagesDetailProduct({ images }: Props) {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    setImage(images[0]);
  }, []);

  const handleClick = (selectedImage: string) => {
    setImage(selectedImage);
  };
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
        {image && (
          <Image
            src={image}
            alt="Imagen del Producto"
            fill
            className="transition-transform duration-500 group-hover:scale-125 object-cover"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        )}
      </div>

      <div className="flex justify-center">
        <CarouselProductDetailImages
          images={images}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default ImagesDetailProduct;
