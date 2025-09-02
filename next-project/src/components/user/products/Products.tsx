import React from 'react';
import Announcements from './Announcements';
import ProductsList from './ProductsList';
import { CategoriesResponse, ProductsResponse } from '@/types';

type Props = {
  initialData: ProductsResponse | null;
  initialCategoriesData: CategoriesResponse | null;
};

function Products({ initialData, initialCategoriesData }: Props) {
  return (
    <div className="flex flex-col">
      <Announcements />
      <ProductsList
        initialData={initialData}
        initialCategoriesData={initialCategoriesData}
      />
    </div>
  );
}

export default Products;
