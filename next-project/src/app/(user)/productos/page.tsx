'use client';
import React from 'react';
import ProductsList from '@/components/user/products/ProductsList';
import Announcements from '@/components/user/products/Announcements';

function Products() {
  return (
    <div className="flex flex-col">
      <Announcements />
      <ProductsList />
    </div>
  );
}

export default Products;
