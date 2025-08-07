'use client';
import React, { useState } from 'react';
import ProductCard from '../../../../components/e-commerce/ProductCard';
import fundaImg from '@/app/assets/funda.webp';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../../components/ui/pagination';
import Link from 'next/link';
import CustomPagination from '@/components/shared/CustomPagination';
import ProductsList from '@/components/e-commerce/ProductsList';

function Fundas() {
  const data = [
    {
      id: 1,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 2,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 3,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 4,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 5,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 7,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 8,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 9,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 10,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 11,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 12,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 13,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 14,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 15,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 16,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 17,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 18,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 19,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 20,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 21,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 22,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 23,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 24,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 25,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 26,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 27,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 28,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 29,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 30,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 31,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 32,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 33,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 34,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 35,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 36,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 37,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
    {
      id: 38,
      img: fundaImg,
      sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas',
      prize: '35',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <ProductsList />
    </div>
  );
}

export default Fundas;
