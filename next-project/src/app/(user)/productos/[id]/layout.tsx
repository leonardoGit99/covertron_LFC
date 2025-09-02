import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Covertron - Producto',
  description: 'Ver detalles de un producto del catálogo de covertron',
};

function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export default ProductLayout;
