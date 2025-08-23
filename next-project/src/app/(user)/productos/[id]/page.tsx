import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getOneProduct } from '@/services/product';
import ImagesDetailProduct from '@/components/user/products/ImagesDetailProduct';
import DetailProduct from '@/components/user/products/DetailProduct';
import Link from 'next/link';

async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data: product } = await getOneProduct(Number(id));
  console.log(product);
  if (!success || !product) {
    return <>Ocurrio un error, Producto no encontrado!</>;
  }

  return (
    <>
      <div className="mt-6 mb-10 px-5 md:px-0">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 min-h-full gap-10 md:gap-20 mb-10">
        <ImagesDetailProduct images={product.images} />
        <DetailProduct product={product} />
      </div>
    </>
  );
}

export default Product;
