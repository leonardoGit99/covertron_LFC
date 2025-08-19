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
  categoryName: string;
};

function ProductCard({
  img,
  name,
  originalPrice,
  discountedPrice,
  discount,
  categoryName,
}: ProductCardProps) {
  return (
    <Card className="group w-[90vw] sm:w-[350px] md:h-[370px]  overflow-hidden shadow-md shadow-slate-400 hover:shadow-lg hover:bg-slate-50 hover:shadow-gray-400  hover:cursor-pointer flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 bg-gradient-to-br from-white via-slate-50 to-sky-100  border-gray-200 dark:from-slate-900 dark:via-slate-950 dark:to-sky-950 dark:border dark:border-white/10 dark:shadow-md dark:shadow-white/20 dark:hover:shadow-gray-400">
      <CardContent>
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={img}
            alt="Funda"
            fill
            className="transition-transform duration-500 group-hover:scale-110 object-cover "
            sizes="(max-width: 640px) 90vw, 400px"
          />
          <div className="absolute top-3 right-3 rounded-lg px-2 py-1 bg-white  text-xs shadow-md text-gray-800 dark:bg-sky-950 dark:text-gray-200">
            {categoryName}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-3 gap-3  flex-grow">
        <p className="flex-grow font-semibold text-gray-900 dark:text-white">{name}</p>
        {/* Price with discount */}
        <div className="flex items-center gap-3">
          <p className="text-md font-bold text-gray-800 dark:text-gray-300">
            Bs. {discountedPrice || originalPrice}
          </p>
          {discount &&
          discount > 0 &&
          discountedPrice &&
          Number(discountedPrice) < Number(originalPrice) ? (
            <span className="text-md text-muted-foreground line-through">
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
