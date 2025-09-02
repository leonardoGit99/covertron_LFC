"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { ProductDetailDTO } from '@/types/product';

// Types
type Props = {
  product: ProductDetailDTO;
};

function DetailProduct({ product }: Props) {
  const wppNumber = '+591XXXXXXX';
  const handleReserveClick = () => {
    const defaultMessage = `Hola! Visité su página web y me interesa adquirir el siguiente producto:\n- Nombre: ${product.name}\n- Marca: ${product.brand}\n- Precio: ${product.discountedPrice} Bs.`;
    window.open(
      `https://wa.me/${wppNumber}?text=${encodeURIComponent(defaultMessage)}`
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-between px-6">
      <div className="flex flex-col gap-4">
        {/* Brand Badge */}
        <div className="flex justify-between items-start">
          <span className="bg-white/100 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-sky-800 dark:bg-sky-900 dark:text-white">
            {product.brand}
          </span>
          <div className="flex flex-col items-end gap-1">
            <div className="bg-sky-500 text-white px-2 py-1 rounded text-xs font-bold">
              NUEVO
            </div>
            <span className="text-xs text-gray-600 dark:text-muted-foreground">
              {product.createdAt}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800 leading-tight dark:text-white">
          {product.name}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-700 text-justify leading-relaxed dark:text-gray-300">
          {product.description}
        </p>

        {/* Price with discount */}
        <div className="flex items-center gap-3">
          <p className="text-3xl font-extrabold text-gray-800 dark:text-white/95">
            Bs. {product.discountedPrice || product.originalPrice}
          </p>
          {product.discount &&
          product.discount > 0 &&
          product.discountedPrice &&
          Number(product.discountedPrice) < Number(product.originalPrice) ? (
            <div className="flex flex-col">
              <span className=" text-gray-500 line-through dark:text-muted-foreground">
                Bs. {product.originalPrice}
              </span>
              <span className="text-sm text-green-600 font-semibold dark:text-green-400">
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
          className="w-full max-w-xs bg-gray-900 text-white/95 hover:text-white/100 hover:bg-gray-800 active:bg-gray-700 rounded-lg dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-600 dark:border dark:border-gray-700"
          onClick={handleReserveClick}
        >
          <FaWhatsapp className="text-lg" />
          Reservar por WhatsApp
        </Button>
      </div>
    </div>
  );
}

export default DetailProduct;
