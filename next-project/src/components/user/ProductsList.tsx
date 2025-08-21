'use client';
import React, { useCallback, useEffect, useState, ChangeEvent } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import {
  getAllAvailableProducts,
  getAllProductsByCategory,
  getFilteredAvailableProducts,
} from '@/services/product';
import { ProductSummary } from '@/types/product';
import CustomPagination from '../shared/CustomPagination';
import { debounce } from 'lodash';
import SearchInput from '../shared/SearchInput';
import Spinner from '../shared/Spinnet';
import Filter from './Filter';
import { Categories } from '@/types';
import { getAllCategories } from '@/services/categories';
import Announcements from './Announcements';

function ProductsList() {
  const [loading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search bar state
  const [categories, setCategories] = useState<Categories>([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;
  const totalPages = Math.ceil(totalProducts / limit);

  // Get all products
  const fetchAvailableProducts = async () => {
    const { success, data } = await getAllAvailableProducts(currentPage, limit);
    if (success && data) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAvailableProducts();
  }, [currentPage, limit]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { success, data } = await getAllCategories();
      if (success && data) {
        setCategories(data.categories);
      }
    };
    fetchCategories();
  }, []);

  // get all filtered products with debounce
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const { data, success } = await getFilteredAvailableProducts(
        value,
        limit,
        currentPage
      );
      if (success && data) {
        setProducts(data.products);
        setTotalProducts(data.total);
      }
      setIsLoading(false);
    }, 500),
    []
  );

  // Onchange for search bar
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    setCurrentPage(1);
    if (value.trim() === '') {
      debouncedSearch.cancel(); // Cancel  any todo execution
      // Si se borra la búsqueda, volver al listado completo
      fetchAvailableProducts();
    } else {
      debouncedSearch(value);
    }
  };

  const handleFilterClick = async (categoryId: number) => {
    setSearchTerm('');
    const { success, data } = await getAllProductsByCategory(
      categoryId,
      limit,
      currentPage
    );
    if (success && data) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
  };

  const handleClearFilterClick = () => {
    setCurrentPage(1);
    setSearchTerm('');
    fetchAvailableProducts();
  };
  return (
    <>
      <div className="flex justify-center md:justify-start items-center w-full gap-3 px-4 md:px-0 mb-2">
        <div className="flex-1">
          <SearchInput
            handleChange={handleChange}
            searchTerm={searchTerm}
          />
        </div>
        <Filter
          categories={categories}
          handleFilterClick={handleFilterClick}
          handleClearFilterClick={handleClearFilterClick}
        />
      </div>
      {loading ? (
        <div className="h-5 w-full"></div>
      ) : (
        <p className="text-sm text-muted-foreground text-start w-full px-4 md:px-0 dark:text-gray-500">
          Tenemos {totalProducts} {totalProducts > 1 ? 'productos' : 'producto'}{' '}
          {totalProducts > 1 ? 'seleccionados' : 'seleccionado'} para ti
        </p>
      )}

      <div className="border-b border-gray-200 mt-6 mb-12 dark:border-gray-600 mx-2" />

      {loading ? (
        <Spinner
          size={50}
          text="Cargando productos, espere un momento por favor..."
          centered
        />
      ) : products.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center">
          {searchTerm
            ? '🔍 No se encontraron productos que coincidan con la búsqueda.'
            : '📭 No hay productos disponibles aún. ¡Pronto tendremos las últimas novedades para ti!'}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-12 mb-12 justify-items-center w-full auto-rows-fr">
            {products.map((product) => (
              <Link
                href={`/productos/${product.id}`}
                key={product.id}
              >
                <ProductCard
                  img={product.image}
                  name={product.name}
                  originalPrice={product.originalPrice}
                  discountedPrice={product.discountedPrice}
                  discount={product.discount}
                  categoryName={product.categoryName}
                />
              </Link>
            ))}
          </div>

          <CustomPagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            limit={limit}
          />
        </>
      )}
    </>
  );
}

export default ProductsList;
