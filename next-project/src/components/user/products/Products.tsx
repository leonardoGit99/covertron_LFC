import React from 'react';
import ProductsList from './ProductsList';
import { CategoriesResponse, ProductsResponse } from '@/types';

type Props = {
  initialData: ProductsResponse | null;
  initialCategoriesData: CategoriesResponse | null;
};

function Products({ initialData, initialCategoriesData}: Props) {
  return (
    <ProductsList
      initialData={initialData}
      initialCategoriesData={initialCategoriesData}
    />
  );
}

export default Products;
