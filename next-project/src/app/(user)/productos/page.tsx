import React from "react";
import Products from "@/components/user/products/Products";
import { getAllProductsByCategory } from "@/services/product";
import { getAllCategories } from "@/services/categories";
import { unstable_noStore as noStore } from "next/cache";
import Announcements from "@/components/user/products/Announcements";

async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: number; page?: string; limit?: string };
}) {
  noStore(); // Force SSR

  const category = searchParams.category || "";
  const currentPage = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 12;

  // fetch products depending on category
  const { data, success } = category
    ? await getAllProductsByCategory(category, limit, currentPage)
    : await getAllProductsByCategory(0, limit, currentPage);

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
