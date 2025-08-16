import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getOneProduct } from '@/services/product';
import ImagesDetailProduct from '@/components/e-commerce/ImagesDetailProduct';
import DetailProduct from '@/components/e-commerce/DetailProduct';
import Link from 'next/link';

async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data: product } = await getOneProduct(Number(id));
  console.log(product)
  if (!success || !product) {
    return <>Ocurrio un error, Producto no encontrado!</>;
  }

  return (
    <div>
      <div className="mt-6 mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
             <Link href={'/productos'}>Catálogo</Link> 
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Producto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-full gap-x-20">
        <ImagesDetailProduct images={product.images} />
        <DetailProduct
          product={product}
        />
      </div>
    </div>
  );
}

export default Product;
