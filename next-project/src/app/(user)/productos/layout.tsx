import React from 'react';
import Navbar from '@/components/user/common/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Covertron - Catálogo',
  description: 'Ver todos los productos disponibles en covertron',
};

function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <Navbar type="default" />
      </div>
      <div className="max-w-6xl mx-auto pt-[5.75rem]">{children}</div>
    </section>
  );
}

export default ProductsLayout;
