import React from 'react';
import Products from '@/components/user/products/Products';
import {
  getAllProductsByCategory,
  getAllAvailableProducts,
} from '@/services/product';
import { getAllCategories } from '@/services/categories';
import { unstable_noStore as noStore } from 'next/cache';
import Announcements from '@/components/user/products/Announcements';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    page?: string;
    limit?: string;
  }>;
}) {
  noStore(); // fuerza SSR

  const { category: categoryParam, limit: limitParam, page:pageParam } = await searchParams;

  const categoryId = categoryParam ? Number(categoryParam) : null;
  const currentPage = pageParam ? Number(pageParam) : 1;
  const limit = limitParam ? Number(limitParam) : 12;

  // Fetch products según categoría
  let productsResponse;
  if (categoryId) {
    const { data, success } = await getAllProductsByCategory(
      categoryId,
      limit,
      currentPage
    );
    if (success) productsResponse = data;
  } else {
    const { data, success } = await getAllAvailableProducts(currentPage, limit);
    if (success) productsResponse = data;
  }

  const { data: categories, success: categoriesSuccess } =
    await getAllCategories();

  return (
    <div className="flex flex-col">
      <Announcements />
      <Products
        initialData={productsResponse || null}
        initialCategoriesData={
          categoriesSuccess && categories ? categories : null
        }
      />
    </div>
  );
}
