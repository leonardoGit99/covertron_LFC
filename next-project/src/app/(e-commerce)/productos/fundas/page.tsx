"use client";
import React, { useState } from 'react';
import ProductCard from '../../../../components/ProductCard';
import fundaImg from '@/app/assets/funda.webp';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../../components/ui/pagination";
import Link from 'next/link';

function Fundas() {
  const data = [
    { id: 1, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 2, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 3, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 4, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 5, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 7, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 8, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 9, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 10, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 11, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 12, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 13, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 14, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 15, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 16, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 17, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 18, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 19, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 20, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 21, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 22, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 23, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 24, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 25, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 26, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 27, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 28, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 29, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 30, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 31, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 32, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 33, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 34, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 35, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 36, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 37, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
    { id: 38, img: fundaImg, sizeAvailable: 'Perfectas para laptops de 14 pulgadas y 15.6 pulgadas', prize: '35' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4  gap-12">
        {paginatedData.map((item) => (
          <Link href={`/productos/fundas/${item.id}`} key={item.id}>
            <ProductCard
              id={item.id}
              img={item.img}
              sizeAvailable={item.sizeAvailable}
              prize={item.prize}
            />
          </Link>
        ))}
      </div>

      <Pagination >
        <PaginationContent >
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePrev();
              }}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {totalPages > 3 && currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Fundas;
