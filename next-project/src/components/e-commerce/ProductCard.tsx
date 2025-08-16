import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import Image, { StaticImageData } from 'next/image';

//  Types
type ProductCardProps = {
  img: StaticImageData | string;
  name: string;
  originalPrice: number;
  discountedPrice: string;
  discount?: number;
};


function ProductCard({
  img,
  name,
  originalPrice,
  discountedPrice,
  discount,
}: ProductCardProps) {
  return (
    <Card className="group w-[90vw] sm:w-[350px] h-[390px] overflow-hidden hover:shadow-md hover:bg-slate-50 hover:shadow-gray-400 transition-shadow duration-300 hover:cursor-pointer flex flex-col">
      <CardContent>
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={img}
            alt="Funda"
            fill
            className="transition-transform duration-500 group-hover:scale-125 object-cover"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        </div>
      </CardContent>

      <CardFooter className="text-slate-700  p-4 gap-3  flex-grow">
          <p className="flex-grow font-semibold">{name}</p>
          {/* Price with discount */}
          <div className="flex flex-col">
            <p className="text-md font-bold text-gray-800">
              Bs. {discountedPrice || originalPrice}
            </p>
            {discount &&
            discount > 0 &&
            discountedPrice &&
            Number(discountedPrice) < Number(originalPrice) ? (
              <span className="text-sm text-gray-500 line-through">
                Bs. {originalPrice}
              </span>
            ) : (
              <></>
            )}
          </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
