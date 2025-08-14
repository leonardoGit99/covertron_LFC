import React from 'react';
import { Button } from '../ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { Product, ProductDetailDTO } from '@/types/product';

// Types
type Props = {
  product: ProductDetailDTO;
};

function DetailProduct({ product }: Props) {
  return (
    <div className="h-full w-full flex flex-col justify-between px-6">
      <div className="flex flex-col gap-4">
        {/* Brand Badge */}
        <div className="flex justify-between items-start">
          <span className="bg-white/100 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-sky-800">
            {product.brand}
          </span>
          <div className="flex flex-col items-end gap-1">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              NUEVO
            </div>
            <span className="text-xs text-gray-600">
              {product.createdAt}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {product.name}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-700 text-justify leading-relaxed">
          {product.description}
        </p>

        {/* Price with discount */}
        <div className="flex items-center gap-3">
          <p className="text-4xl font-extrabold text-gray-800">
            Bs. {product.discountedPrice || product.originalPrice}
          </p>
          {product.discount &&
          product.discount > 0 &&
          product.discountedPrice &&
          Number(product.discountedPrice) < Number(product.originalPrice) ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 line-through">
                Bs. {product.originalPrice}
              </span>
              <span className="text-xs text-green-600 font-semibold">
                {product.discount}% OFF
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Wpp button */}
      <div className="w-full flex justify-center mt-6">
        <Button
          variant="default"
          className="w-full max-w-xs"
        >
          <FaWhatsapp className="text-lg" />
          Reservar por WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default DetailProduct;
