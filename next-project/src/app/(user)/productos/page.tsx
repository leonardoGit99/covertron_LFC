import React from 'react';
import Products from '@/components/user/products/Products';
import { getAllAvailableProducts } from '@/services/product';
import { getAllCategories } from '@/services/categories';
import { unstable_noStore as noStore } from 'next/cache';
import Announcements from '@/components/user/products/Announcements';
async function ProductsPage() {
  noStore(); // Fuerza SSR
  const { data, success } = await getAllAvailableProducts(1, 12);
  const { data: categories, success: categoriesSuccess } =
    await getAllCategories();

  return (
    <div className="flex flex-col">
      <Announcements />
      <Products
        initialData={success && data ? data : null}
        initialCategoriesData={
          categories && categoriesSuccess ? categories : null
        }
      />
    </div>
  );
}

export default ProductsPage;
