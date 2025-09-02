import React from 'react';
import Products from '@/components/user/products/Products';
import { getAllAvailableProducts } from '@/services/product';
import { getAllCategories } from '@/services/categories';

async function ProductsPage() {
  const { data, success } = await getAllAvailableProducts(1, 12);
  const { data: categories, success: categoriesSuccess } =
    await getAllCategories();
  return (
    <Products
      initialData={success && data ? data : null}
      initialCategoriesData={categories && categoriesSuccess ? categories: null}
    />
  );
}

export default ProductsPage;
