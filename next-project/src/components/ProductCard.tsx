import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import Image, { StaticImageData } from 'next/image'
type ProductCardProps = {
  id: number;
  img: StaticImageData | string;
  sizeAvailable: string;
  prize: string;
}

type ColorKey = 'beige' | 'blue' | 'brown';

const colorClasses: Record<ColorKey, string> = {
  beige: 'bg-[#C77E4F]',
  blue: 'bg-[#003672]',
  brown: 'bg-[#787878]',
};

const availableColors: ColorKey[] = ['beige', 'blue', 'brown'];

function ProductCard({ id, img, sizeAvailable, prize }: ProductCardProps) {
  return (
    <Card className='group w-[90vw] sm:w-[350px] overflow-hidden hover:shadow-md hover:bg-slate-50 hover:shadow-gray-400 transition-shadow duration-300 hover:cursor-pointer'>
      <CardContent>
        <div className='relative w-full aspect-[4/3] overflow-hidden'>
          <Image
            src={img}
            alt="Funda"
            fill
            className="transition-transform duration-500 group-hover:scale-125 object-cover"
            sizes="(max-width: 640px) 90vw, 400px"
          />
        </div>
      </CardContent>
      <CardFooter className='text-slate-700  p-4 gap-3'>
        <div>
          <p className='font-semibold'>
            {sizeAvailable}
          </p>
          <p>
            {prize} Bs.
          </p>
        </div>
        <div className="flex gap-2">
          {availableColors.map((c, i) => (
            <span
              key={i}
              className={`w-4 h-4 rounded-full ${colorClasses[c]} border border-gray-300`}
            />
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard