'use client';
import React from 'react';
import ProductsList from '@/components/user/ProductsList';
import Announcements from '@/components/user/Announcements';

function Products() {
  return (
    <div className="flex flex-col">
      <Announcements />
      <ProductsList />
    </div>
  );
}

export default Products;
