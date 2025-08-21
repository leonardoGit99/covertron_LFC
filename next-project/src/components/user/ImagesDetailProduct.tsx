'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CarouselProductDetailImages } from './CarouselProductDetailImages';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

type Props = {
  images: string[];
};

function ImagesDetailProduct({ images }: Props) {
  const [image, setImage] = useState<string>('');
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setImage(images[0]);
  }, []);

  const handleClick = (selectedImage: string, selectedIndex: number) => {
    setImage(selectedImage);
    setCurrentIndex(selectedIndex);
  };
  return (
    <div className="h-full w-full flex flex-col gap-5 px-5 md:px-0">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl hover:cursor-pointer">
        <div
          onClick={() => setOpenImage(true)}
          className="absolute inset-0  hover:bg-black/15 z-10 transition-all  duration-300 ease-in-out "
        />
        {image && (
          <Image
            src={image}
            alt="Imagen del Producto"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        )}
      </div>

      <Lightbox
        open={openImage}
        close={() => setOpenImage(false)}
        slides={images.map((image) => ({ src: image }))}
        index={currentIndex}
        plugins={[Zoom]}
      />

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
