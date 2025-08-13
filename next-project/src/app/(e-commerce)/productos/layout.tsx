import React from 'react';
import Products from './page';
import Navbar from '@/components/Navbar';

function ProductsLayout() {
  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto pt-[5.75rem]">
        <Products />
      </div>
    </section>
  );
}

export default ProductsLayout;
